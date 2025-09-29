const db = require('./../config/conection');


class User extends db.Sequelize.Model{
    static associate(models) {
        User.hasMany(models.Budge, {foreignKey: "userId", as: "budges"});
        User.belongsTo(models.Role, {foreignKey: 'roleId', as: 'role'});
    }
}

User.init({
    id:{
        type: db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    firstName: {
        type: db.Sequelize.STRING
    },
    lastName: {
        type: db.Sequelize.STRING
    },
    email: {
        type: db.Sequelize.STRING,
        unique: true,
    },
    password: {
        type: db.Sequelize.STRING
    }},{
        sequelize: db.sequelize,
        modelName: 'User',
        tableName: 'users'
    }
);



module.exports = User;