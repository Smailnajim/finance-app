const db = require('./../config/conection');
// const models = require('./index');

class Budge extends db.Sequelize.Model{
    static associate(models) {
        console.log('imhrt =====', models)
        Budge.belongsTo(models.User, {foreignKey: 'userId', as: 'user'});
        Budge.belongsTo(models.Category, {foreignKey: 'categoryId', as: 'category'});
        Budge.hasMany(models.Transaction, {foreignKey: 'budgeId', as: 'transactions'});
        console.log('================firte ====');

    }
}

Budge.init({
    id: {
        type: db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    mothly: {
        type: db.Sequelize.FLOAT,
    },
    rest: {
        type: db.Sequelize.FLOAT,
    },
    status: {
        type: db.Sequelize.BOOLEAN,
    }},{
    sequelize: db.sequelize,
    modelName: 'Budge',
    tableName: 'budges'
});



module.exports = Budge;