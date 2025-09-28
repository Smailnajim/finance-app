const { Sequelize } = require('sequelize');
const params = require('./params');

const sequelize = new Sequelize(params.dataBase, params.name, params.code, {
    host: params.host,
    dialect: params.dialect
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;