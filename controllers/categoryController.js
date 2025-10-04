const models = require('./../models');


exports.findByName = async (name) => {
    try{
        const category = await models.Category.findOne({
            where: {
                name: name
            },
            attributes: ['name']
        });
        if (category){
            return false;//return 'allredy existe';
        } 
        return true;
    }catch(error){
        console.error('---------------categoryController---select---error--->', error, '***************');
    }
}

exports.create = async (req, res) => {
    try{
                console.log('--creat-------<---req body-->-----<--', req.body.category);
        // req.body.name smite newCategory
        const statu = await this.findByName(req.body.category);
        if (statu) await models.Category.create({name: req.body.category});
        return res.redirect('/budge');
    }catch(error){
        console.error('---------------categoryController---create---error--->', error, '***************');
    }
    
}

exports.getAll = async () => {
    const all = await models.Category.findAll({
        attributes: ['name']
    });
    return all;
}

exports.renderBudge = async (req, res) => {
    try{
        const categories = await this.getAll();
        res.render('budge', {categories, session: req.session});
        return;
    }catch(error){
        console.log('---------<---error-->-----<--', error);
    }
}