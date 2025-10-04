const models = require('./../models');


exports.findByName = async (name) => {
    try{
        const category = await models.Category.findOne({
            where: {
                name: name
            },
            attributes: ['name']
        });
        console.log('<<<<<<<<<<<<<< categoryController---select', category.name)
        if (category.name){
            console.log('||||||| ||||||||| ||||||||');
            return res.redirect('/home');
        } //return 'allredy existe';
        return;
    }catch(error){
        console.error('---------------categoryController---select---error--->', error, '***************');
    }
}

exports.create = async (req, res) => {
    try{
        // req.body.name smite newCategory
        await this.findByName('name');
        await models.Category.create({name: 'name'});
        return res.redirect('/transaction');
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