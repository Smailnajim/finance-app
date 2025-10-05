const models = require('./../models');
const categoryController = require('./../controllers/categoryController');

exports.renderBudge = async (req, res) => {
    try{
        const categories = await categoryController.getAll();
        res.render('budge', {massage: res.locals.massage, categories, session: req.session});
        return;
    }catch(error){
        console.log('---------<---error-->-----<--', error);
    }
}

exports.inserIntoBudge = async (req, res)=>{
    // req.session.user.id  bach nchof ga3 budge li 3ndo
    // req.name bach nhded ina whda fihom 
    // req.mony chal ghthet

    try{
        const budge = await models.Budge.findOne({
            where: {userId: 1},
            include: [{
                model: models.Category,
                as: 'category',
                where: {name: 'wallet'},
                attributes: []
            }] 
        });
        budge.monthly = budge.monthly ? budge.monthly + mony : mony;
        return;
    }catch(error){
        console.log('error->>>', error, '---<<<');
    }
}

exports.insertIntoWallet = async (req, res) => {
    req.locals.name = 'walet';
    return await this.inserIntoBudge(req, res);
}

exports.create = async (req, res) => {
    //req.body.category bach nmizo bin budge w alakhor 
    // req.session.user.id budge dyalmen 
    // req.body.monthly w ymken dir lih update
    // atatus active

    try{
        const category = await categoryController.create(req, res);
        console.log('////////////////////******', req.body.category);
        
        let budge = await models.Budge.findOne({
            where : {userId: 5},
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
            userId: 5,
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