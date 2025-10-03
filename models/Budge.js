const db = require('./../config/conection');
const status = require('./../enum/status');

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
    userId: {
        type: db.Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    categoryId: {
        type: db.Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'categories',
            key: 'id',
        }
    },
    monthly: {
        type: db.Sequelize.FLOAT,
    },
    rest: {
        type: db.Sequelize.FLOAT,
    },
    status: {
        type: db.Sequelize.ENUM([...status]),
    }},{
    sequelize: db.sequelize,
    modelName: 'Budge',
    tableName: 'budges'
});


module.exports = Budge;