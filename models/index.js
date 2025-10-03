const User = require('./User');
const Category = require('./Category');
const Budge = require('./Budge');
const Transaction = require('./Transaction');

const models = {User, Budge, Transaction, Category };
Object.values(models).forEach(model => {
    if (model.associate) model.associate(models);
    console.log('------++++----+');
});


module.exports = models;   