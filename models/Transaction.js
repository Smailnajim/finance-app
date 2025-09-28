const db = require('./../config/conection');

// const models = require('./index');

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

// Transaction.associate = (models) => {
// }

module.exports = Transaction;