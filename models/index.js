const User = require('./User');
const Budge = require('./Budge');
const Transaction = require('./Transaction');
const Category = require('./Category');

const models = {User, Budge, Transaction, Category };
User.associate(models);
Category.associate(models);
Budge.associate(models);
Transaction.associate(models);
