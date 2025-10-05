const models = require('./../models');
const budgeuser = require('./userController');


const allWalletByUser = async (req, res) => {
    try{
        const categories = await models.Category.findAll({
            include: [{
                model: models.Budge,
                as: 'budges',
                where: {userId: 1},
                attributes: []
            }]
        });

        console.log(categories.length, '---<');
        return categories;
    }catch(error){
        console.log(error, '---error---<');
    }
    
}

exports.renderTransaction = async (req, res) => {
    const b = await budgeuser.budgeOfThisUser(req, res);
    // const categories = await models.Budge.findAll({
    //     where: {userId: 1},
    //     include:  [{
    //         model: models.Category,
    //         as: 'category',
    //     }],
    //     attributes: []
    // });
    const categories = await allWalletByUser(req, res);
    console.log('------categories--------\n','\n--------------');
    return res.render('transaction', {budge: b, categories});
    // console.log('***---+++***---+++=====');
    // console.log(allWalletByUser(req, res));
}