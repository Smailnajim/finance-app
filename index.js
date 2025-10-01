const express = require('express');
const app = express();
const PORT = 3000;
const path = require('path');
const db = require('./config/conection');
const userC = require('./controllers/userController');
const session = require('express-session');
const flash = require('connect-flash');
const isAuth = require('./middleware/isAuth');
const Transaction = require('./models/Transaction');
const cookieParser = require('cookie-parser');


app.use(session({
    secret: 'KEY200#',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } 
}));
app.use(cookieParser('keyboard cat'));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 180000 }
}));
app.use(flash());


app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

db.sequelize.authenticate()
.then( () => {
  console.log('Connexion MySQL is good');
  return db.sequelize.sync({ alter: true });
})
.then(() => {
  console.log('==========================');
  console.log('create all tables is Done');
})
.catch(err => {console.log(err.parent, '<--- ERROR')});


app.get('/home',isAuth, function(req, res){
  userC.renderHome(req, res);
});

app.get('/login', function(req, res){
  return userC.renderLogin(req, res);
});
app.post('/login', function(req, res){
  return userC.login(req, res);
});

app.get('/register', function(req, res){
  return userC.register(req, res);
});
app.post('/register', function(req, res){
  const user = userC.create(req, res);
  console.log(user);
});

app.get('/logout', function(req, res){
  userC.logout(req, res);
});

app.listen(PORT, ()=>{
  console.log(`Server running on http://localhost:{PORT}`);
});