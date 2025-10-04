const models = require('./../models');
const User  = require('./../models/User');
const session = require('express-session');
const flash = require('connect-flash');

const bcrypt = require('bcrypt');
const Budge = require('../models/Budge');
const Category = require('../models/Category');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';

exports.budgeOfThisUser = async (req, res) => {
    try{
        const budge = await Budge.findOne({
            where: {
                userId: 1 /*req.session.user.id*/
            },
            attributes: [ 'rest' ],
            include: [{
                model: Category,
                as: 'category',
                where: {
                    name: 'wallet',
                }
            }]
        });
        console.log('user--->', budge.rest);
        console.log('-------------------------------------');
        console.log('+++++++++++++++++++++++++++++++++++++');
        
        return budge.rest;
    }catch(error){
        console.log('*************************************');
        console.log('homer --->',error);
        return;
    }
}

const lastThreeTransaction = async (req, res) => {
    try{
        const three = await models.Transaction.findAll({
            include: [{
                model: models.Budge,
                as: 'budge',
                where: {userId: 1/*req.session.user.id*/},
                attributes: []
            }],
            order: [['createdAt', 'DESC']],
            limit: 3,
        });
        console.log(three);
        console.log('three====');
        return three;
    }catch(error){
        console.log('="="="=',error);
    }
}



exports.renderHome =  async (req, res) => {
    /*if(!req.session.user){
        res.redirect('/register');
        return;
    }*/
    try{
        let three = await lastThreeTransaction(req, res);
        const wallet = await this.budgeOfThisUser(req, res);
        console.log('*************************************');
        three.push({budgeTransation : '1', explain : '2', budgeId: '3'});
        console.log(three);
        console.log('three====2');
        return res.render('home', {session: req.session, wallet, three});
    }catch(error){
    }
}

exports.register = (req, res) => {
    const message = req.flash('message');
    return res.render('register',  {message});
}


exports.renderLogin = (req, res) => {
    let message = req.flash('message');
    return res.render('login', {message});
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
            console.log("session =====--=>", user);
            req.session.user = user;
            console.log('session ========= user =', req.session.user);
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
        }).then(()=>{
            console.log('____________----_______');
            return res.redirect('/home');
        }).catch((error)=>console.error('errrorrooooo=====>', error, '<====<=<=<=<=<'));
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