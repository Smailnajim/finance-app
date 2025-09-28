const User = require('./User');
const Budge = require('./Budge');
const Transaction = require('./Transaction');
const Category = require('./Category');

const models = {User, Budge, Transaction, Category};

User.associate({Budge});

Budge.associate(models);
// Budge.associate(models); -------> erroe don't

Transaction.associate({Budge});

Category.associate({Budge});