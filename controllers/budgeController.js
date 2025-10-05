const models = require('./../models');
const categoryController = require('./../controllers/categoryController');

exports.renderBudge = async (req, res) => {
    try{
        const categories = await categoryController.getAll();
        const wallet = await models.Budge.findOne({
            where: {
                userId: 1
            },
            include: [{
                model: models.Category,
                as: 'category',
                where: {name: 'wallet'}
            }]
        });
        res.render('budge', {massage: res.locals.massage, categories, session: req.session, wallet});
        return;
    }catch(error){
        console.log('---------<----->-----<--', error);
    }
}

exports.inserIntoBudge = async (req, res)=>{
    // req.session.user.id  bach nchof ga3 budge li 3ndo
    // req.category name bach nhded ina whda fihom 
    // req.mony chal ghthet

    try{
        console.log('error->>>', req.body.mony, '---<<<');
        const budge = await models.Budge.findOne({
            where: {userId: 1},
            include: [{
                model: models.Category,
                as: 'category',
                where: {name: res.locals.name},
                attributes: []
            }],
            raw: false
        });
        console.log(budge);
        if(!budge || !req.body.mony) console.log('++--\n', budge, '++--\n',);
        budge.rest = budge.rest ? budge.rest + parseFloat(req.body.mony) : parseFloat(req.body.mony);
        await budge.save();
        return res.redirect('/budge');
    }catch(error){
        console.log('error->>>', error, '---<<<');
    }
}

exports.insertIntoWallet = async (req, res) => {
    res.locals.name = 'wallet';
    return await this.inserIntoBudge(req, res);
}

exports.create = async (req, res) => {
    //req.body.category bach nmizo bin budge w alakhor 
    // req.session.user.id budge dyalmen 
    // req.body.monthly w ymken dir lih update
    // atatus active

    try{
        const category = await categoryController.create(req, res);
        console.log('////////////////////******\n', category.id);
        
        let budge = await models.Budge.findOne({
            where : {userId: 1},
            include: [{
                model: models.Category,
                as: 'category',
                where: {
                    name: req.body.category,
                },
                attributes: ['name']
            }],
            attributes: ['id', 'userId']
        });

        if(budge){
            req.flash('message', 'you have allredy this budge');
            res.locals.massage = req.flash('message'); 
            this.renderBudge(req, res);
        }
        console.log('////////////////////******');

        budge = await models.Budge.create({
            userId: 1,
            categoryId: category.id,
            status: 'active',
        });
        console.log('////////////////////******', budge);
        req.flash('message', 'this budge created by seccessfly');
        res.locals.massage = req.flash('message'); 
        this.renderBudge(req, res);
    }catch(error){
        console.error('----------<--error-->-------',error);
    }
}