const User = require('./../models/User');
const session = require('express-session');


const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';

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
        console.log(req.body.password, '1<====');
        new Promise((resolve, reject)=>{
            bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
                if (err) reject(err)
                resolve(hash)
            });
        }).then((res) => {
            console.log(req.body.password, '2<====');
            req.body.password = res;
            return User.create(req.body);
        }).then((res) => {
            return res.redirect('/login');
        }).catch((error)=>console.error('=====>', error, '<===='));
        
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