const express = require('express');
const app = express();
const PORT = 3000;
const db = require('./config/conection');
const User = require('./models/User');
const Budge = require('./models/Budge');
const { FORCE } = require('sequelize/lib/index-hints');



app.use(express.urlencoded({extended: true}));
app.use(express.json());

db.sequelize.authenticate()
.then(() => console.log('Connexion MySQL réussie'))
.catch(err => console.error(' Erreur connexion:', err));


User.sync({alter: true})
.then(() => { console.log('creating user tables is Done')})
.catch(err => {console.log(err, 'User errrrrrrrrrrrrrror')});

Budge.sync({alter: true})
.then(() => { console.log('budge tables is Done')})
.catch(err => {console.log(err, 'Budge errrrrrrrrrrrrrror')});




app.post('/', function(req, res){
  res.status(200).send(arr1);
});





app.listen(PORT, ()=>{
  console.log(`Server running on http://localhost:{PORT}`);
});