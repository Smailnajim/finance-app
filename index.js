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
const routes = require('./routes/web');

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

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

db.sequelize.authenticate()
.then( () => {
  console.log('Connexion MySQL is good');
  return db.sequelize.sync({alter: true});
})
.then(() => {
  console.log('==========================');
  console.log('create all tables is Done');
})
.catch(err => {console.log(err.parent, '<--- ERROR')});

app.use('/', routes);

app.listen(PORT, ()=>{
  console.log(`Server running on http://localhost:{PORT}`);
});