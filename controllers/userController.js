const User = require('./../models/User');


exports.register = (req, res) => {
    res.render('register');
}

exports.login = (req, res) => {
    res.render('login');
}


exports.create = async (req, res) => {
    try{
        console.log('========= iam creating user =======');
        const { email: mail } = req.body;
        console.log('=========  =======', mail);
        const isExiste = await User.findOne({ where: { email: mail } });
        console.log('=========  =======', isExiste);
        if(isExiste){
            req.flash({"message": "Email exist"});
            return res.redirect('/register');
        }
        const user = await User.create(req.body);
        return res.redirect('/login');
    }catch (error){
        return error;
    }
}

