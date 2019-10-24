var express = require('express');
var router = express.Router();
var userModel = require('./../model/loginModel');

router.get('/registration', function(req,res){
    res.render('registration',{user: req.session.un});
});

router.post('/registration', function(req,res){
    var user = {
		username: req.body.username,
		password: req.body.password,
		cmp_name: req.body.full_name,
		emp_name: req.body.address,
		contact:  req.body.contact,
	};
	
	userModel.insert(user, function(status){
		
		if(status){
			res.redirect('/login/userlist');
		}else{
			res.send('/dashboard');
		}
	});
});
module.exports=router;