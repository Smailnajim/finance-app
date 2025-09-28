const db = require('./../config/conection');

// const models = require('./index');

class Category extends db.Sequelize.Model{
    static associate(models) {
        Category.hasMany(models.Budge, {foreignKey: 'categoryId', as: 'budges'});
    }
}

Category.init({
    id: {
        type: db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: db.Sequelize.STRING
    }},
    {
        sequelize: db.sequelize,
        modelName: "Category",
        tableName: 'categories'
    }
);

// Category.associate = (models) => {
    
// }


module.exports = Category;