const express = require('express');
const app = express();
const PORT = 3000;
const db = require('./config/conection');
const User = require('./models/User');
const Budge = require('./models/Budge');


app.use(express.urlencoded({extended: true}));
app.use(express.json());



db.sequelize.authenticate()
.then(() => {
  console.log('Connexion MySQL is good');
  return db.sequelize.sync({alter: true});
})
.then(() => { 
  console.log('==========================')
  console.log('create all tables is Done');
})
.catch(err => {console.log(err, '<--- ERROR')});




app.get('/', function(req, res){
  res.status(200).send(arr1);
  return;
});





app.listen(PORT, ()=>{
  console.log(`Server running on http://localhost:{PORT}`);
});