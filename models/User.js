const db = require('./../config/conection');
const Budge = require('./Budge');

class User extends db.Sequelize.Model{}

User.init({
    id:{
        type: db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    firsName: {
        type: db.Sequelize.STRING
    },
    lastName: {
        type: db.Sequelize.STRING
    },
    email: {
        type: db.Sequelize.STRING,
        unique: true
    },
    password: {
        type: db.Sequelize.STRING
    }},{
        sequelize: db.sequelize,
        modelName: 'User'
    }
);

User.hasMany(Budge, {
    forignKey: "user_id",
    as: "budges"
});

module.exports = User;