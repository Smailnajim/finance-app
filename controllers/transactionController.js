const Transaction = require('./../models/Transaction');

exports.renderTransaction = (req, res) => {
    return res.render('transaction');
}