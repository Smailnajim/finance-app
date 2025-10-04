const models = require('./../models');
const budgeuser = require('./userController');


const allWalletByUser = async (req, res) => {
    try{
        const categories = await models.Budge.findAll({
            where: {userId: 1 /* req.session.user.id */},
            include: [{
                model: models.Category,
                as: 'category',
                attributes: ['name']
            }]
        });
        console.log(categories, '---<');
    }catch(error){
        console.log(error, '---error---<');
    }
    
}

exports.renderTransaction = async (req, res) => {
    const b = await budgeuser.budgeOfThisUser(req, res);
    return res.render('transaction', {budge: b});
    // console.log('***---+++***---+++=====');
    // console.log(allWalletByUser(req, res));
}