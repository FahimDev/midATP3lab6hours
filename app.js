var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var user_login = require('./controller/login');
var customer_reg = require('./controller/registration');
var expSession = require('express-session');

app.set('view engine','ejs');
app.use(expSession({secret:'my top secret value', saveUninitialized:true, resave: false}));
app.use(bodyParser.urlencoded({extended:true}));
app.use('/login' , user_login);
app.use('/registration', customer_reg );
app.get('/', function(req,res){
    res.render('dashboard', {user:'User name will identify user type automatically'});
});

app.listen(3000, function(){
    console.log('SERVER STARTED AT 3000!.....');
});
