var express = require('express');
var router = express.Router();
var userModel = require('./../model/loginModel');

router.get('/', function(req,res){
    res.render('login');
});

router.get('/success', function(req,res){
    res.render('success',{user: req.session.un});
});


router.get('/addNewproduct', function(req,res){
    res.render('addNewproduct',{user: req.session.un});
});

router.get('/userlist', function(req,res){
    
	userModel.getAll(function(status){
		
		if(status){
			res.render('userlist', { userList:status});
		}else{
			res.redirect('/user/edit/'+req.params.id);
		}
	});
});

router.post('/addNewproduct', function(req,res){
    var user = {
		gender: req.body.gender,
		product_name: req.body.product_name,
		img: req.body.img,
		discription: req.body.discription,
		size:  req.body.size,
		color:  req.body.color,
		prize:  req.body.prize,
	};
	
	userModel.addProd(user, function(status){
		
		if(status){
			res.redirect('/login/productList');
		}else{
			res.send('/dashboard');
		}
	});
});


router.post('/', function(request, response){
	
	var user = {
		username: request.body.username,
		password: request.body.password
	};

	userModel.validate(user, function(status){
		if(status != null){
            response.cookie('username', request.body.username);
			console.log(status.user_type);
            request.session.un = status.user_type;
			response.redirect('/login/success');
		}else{
			response.send('invalid username/password');		
		}
	});

});

router.get('/registration', function(req,res){
    res.render('registration',{user: req.session.un});
});

router.post('/registration', function(req,res){
    var user = {
		username: req.body.username,
		password: req.body.password,
		cmp_name: req.body.cmp_name,
		emp_name: req.body.emp_name,
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
