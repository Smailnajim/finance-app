const models = require('./../models');

exports.create = async (req, res) => {
    try{
        const category = models.Category.findOne({
            where: {
                name: 'newCategory'
            },
            attributes: ['name']
        });
        if (category.name) return 'allredy existe';
    }catch(error){
        console.error('categoryController---select---error--->', error, '***************');
    }
    try{
        await models.Category.create({name: 'newCategory'});
    }catch(error){
        console.error('categoryController---select---error--->', error, '***************');
    }
    
}