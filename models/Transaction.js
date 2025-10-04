const status = require('../enum/status');
const db = require('./../config/conection');


class Transaction extends db.Sequelize.Model{
    static associate(models) {
        Transaction.belongsTo(models.Budge, {foreignKey: 'budgeId', as: 'budge'});
    }
}


Transaction.init({
    id: {
        type: db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    budgeId: {
        type: db.Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'Budges',
            key: 'id'
        }
    },
    budgeTransation: {
        type: db.Sequelize.FLOAT,
        allowNull: false
    },
    explain: {
        type: db.Sequelize.STRING,
        allowNull: true
    }},
    {
        sequelize: db.sequelize,
        modelName: "Transaction",
        tableName: 'transactions'
    }
);

module.exports = Transaction;