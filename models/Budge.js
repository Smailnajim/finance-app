const db = require('./../config/conection');
const User = require('./User');

class Budge extends db.Sequelize.Model{}

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
    modelName: 'Budge'
});




module.exports = Budge;