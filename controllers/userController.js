const User = require('./../models/User');
const session = require('express-session');
const flash = require('connect-flash');

const bcrypt = require('bcrypt');
const Budge = require('../models/Budge');
const Category = require('../models/Category');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';

exports.renderHome = (req, res) => {
    console.log(req.session.user, '=======----');
    res.render('home', {session: req.session});
}

exports.register = (req, res) => {
    res.render('register',  {message: false});
    return;
}


exports.renderLogin = (req, res) => {
    res.render('login');
}

exports.create = async (req, res) => {
    try{
        console.log(req.session.user, '========= iam creating user =======');
        const { email: mail } = req.body;
        console.log('mail =========  =======', mail);
        const isExiste = await User.findOne({ where: { email: mail } });
        console.log('=========  user =======', isExiste);

        if(isExiste){
            console.log('88');
            req.flash("message", "Email exist");
            console.log('7 e');
            res.redirect('/register');
            return;
        }
        console.log(req.body.password, '1<====');
        new Promise((resolve, reject)=>{
            bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
                if (err) reject(err)
                resolve(hash)
            });
        }).then((hash) => {
            console.log(req.body, '2<====');  //create user
            req.body.password = hash;
            return User.create(req.body);
        }).then((user)=>{
            console.log('=-=-=-> --- --- ---', user);
            return new Promise(async (resolve, reject)=>{  //create wallet category or get it
                let category = await Category.findOne({where:{ name: 'wallet'}});
                if(category){
                    console.log("==--=>", user);
                }
                else{
                    console.log("==--=> not find");
                    category = await Category.create({ name: 'wallet'});
                }
                resolve({category, user});
            });
        }).then((res)=>{               //create Budge 
            // console.log('=-=-=-> --- --- ---', res.category, res.user);
            const budge = Budge.create({
                userId:  res.user.id,
                categoryId: res.category.id,
                mothly: null,
                rest: 0,
                status: 'active'
            });
        }).catch((error)=>console.error('=====>', error, '<====<=<=<=<=<'));
        return res.redirect('/login');
    }catch (error){
        return error;
    }
}

exports.login = async (req, res) => {
    const { email: mail } = req.body;
    try{
        const user = await User.findOne({
            where: {
                email: mail,
            }
        });
        if(!user || !(user.password == req.body.password)){
            // Load hash from your password DB.
            bcrypt.compare(req.body.password, user.password, function(err, result) {
                if (result){
                    req.session.user = user;
                    // return this.renderHome(req, res);
                    res.render('home', {session: req.session});
                    return;
                }else{
                    req.flash('message', 'email or password falte');
                    return res.redirect('/login');
                }
            });
        }
    }catch (error){
        console.error('== == == == == == == == == ==', error);
    }
}

exports.logout = (req, res) => {
    delete req.session.user;
    return res.redirect('/login');
}