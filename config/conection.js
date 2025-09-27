const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('finance-app', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;