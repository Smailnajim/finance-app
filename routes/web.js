app.get('/', (req, res)=>{
    res.render('index', {p: 'this is paragraph.'});
});
