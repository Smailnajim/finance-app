const express = require('express');
const path = require('path');
const PORT = 3000;

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res)=>{
    res.render('index', {p: 'This is paragraph.'});
});

app.listen(PORT, ()=>{
    console.log(`Server running on http://localhost:{PORT}`);
});