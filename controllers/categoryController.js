const models = require('./../models');


exports.findByName = async (name) => {
    try{
        const category = await models.Category.findOne({
            where: {
                name: name
            },
            attributes: ['id', 'name']
        });
        return category;
    }catch(error){
        console.error('---------------categoryController---select---error--->', error, '***************');
    }
}

exports.create = async (req, res) => {
    try{
                console.log('--creat-------<---req body-->-----<--', req.body.category);
        // req.body.name smite newCategory
        let category = await this.findByName(req.body.category);
        if (!category){
            category = await models.Category.create({name: req.body.category});
        }
        return category;
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