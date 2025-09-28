const db = require('./../config/conection');

// const models = require('./index');

class User extends db.Sequelize.Model{
    static associate(models) {
        User.hasMany(models.Budge, {foreignKey: "userId", as: "budges"});
    }
}

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
        type: db.Sequelize.STRING(300),
        unique: true
    },
    password: {
        type: db.Sequelize.STRING
    }},{
        sequelize: db.sequelize,
        modelName: 'User',
        tableName: 'users'
    }
);
// User.associate = (models) => {
    
// }


module.exports = User;