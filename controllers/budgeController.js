const models = require('./../models');

exports.create = (req, res) => {
    
}

exports.inserIntoBudge = async (req, res)=>{
    // req.session.user.id  bach nchof ga3 budge li 3ndo
    // req.name bach nhded ina whda fihom 
    // req.mony chal ghthet

    try{
        const budge = await models.Budge.findOne({
            where: {userId: 1},
            include: [{
                model: models.Category,
                as: 'category',
                where: {name: 'wallet'},
                attributes: []
            }] 
        });
        budge.monthly = budge.monthly ? budge.monthly + mony : mony;
        return;
    }catch(error){
        console.log('error->>>', error, '---<<<');
    }
}

exports.insertIntoWallet = async (req, res) => {
    req.locals.name = 'walet';
    return await this.inserIntoBudge(req, res);
}