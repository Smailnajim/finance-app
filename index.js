const express = require('express');
const app = express();
const PORT = 3000;
const path = require('path');
const db = require('./config/conection');
const User = require('./models/User');
const Budge = require('./models/Budge');
const userC = require('./controllers/userController');

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

db.sequelize.authenticate()
.then(() => {
  console.log('Connexion MySQL is good');
  return db.sequelize.sync({alter: true});
})
.then(() => {
  console.log('==========================');
  console.log('create all tables is Done');
})
.catch(err => {console.log(err.parent, '<--- ERROR')});



app.get('/login', function(req, res){
  return userC.login(req, res);
});

app.get('/register', function(req, res){
  return userC.register(req, res);
});
app.post('/register', function(req, res){
  const user = userC.create(req, res);
  console.log(user);
});





app.listen(PORT, ()=>{
  console.log(`Server running on http://localhost:{PORT}`);
});