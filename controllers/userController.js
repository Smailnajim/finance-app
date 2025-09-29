const User = require('./../models/User');
const session = require('express-session');

exports.renderHome = (req, res) => {
    console.log(req.session.user, '=======----');
    res.render('home', {session: req.session});
}

exports.register = (req, res) => {
    res.render('register');
}


exports.renderLogin = (req, res) => {
    res.render('login');
}

exports.create = async (req, res) => {
    try{
        console.log(req.session.user, '========= iam creating user =======');
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

exports.login = async (req, res) => {
    const { email: mail } = req.body;
    try{
        console.log('ee');
        const user = await User.findOne({
            where: {
                email: mail,
            }
        });
        if(!user || !(user.password == req.body.password)){
            req.flash('message', 'email or password falte');
            return res.redirect('/login');
        }
        req.session.user = user;
        return this.renderHome(req, res);
    }catch (error){
        console.error('== == == == == == == == == ==', error);
    }
}

exports.logout = (req, res) => {
    delete req.session.user;
    return res.redirect('/login');
}