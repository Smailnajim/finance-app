const models = require('./../models');

exports.create = async (req, res) => {
    // req.body.name smite newCategory
    try{
        const category = await models.Category.findOne({
            where: {
                name: 'bb'
            },
            attributes: ['name']
        });
        console.log('<<<<<<<<<<<<<< categoryController---select', category.name)
        if (category.name){
            console.log('||||||| ||||||||| ||||||||');
            return res.redirect('/home');
            
        } //return 'allredy existe';
    }catch(error){
        console.error('---------------categoryController---select---error--->', error, '***************');
    }
    try{
        await models.Category.create({name: 'bb'});
        return res.redirect('/transaction');
    }catch(error){
        console.error('---------------categoryController---create---error--->', error, '***************');
    }
    
}