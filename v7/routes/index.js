var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

//root route
router.get("/", function(req, res){
	res.render("landing");
});

/////////////////
// AUTH ROUTES
/////////////////

//show register form
router.get("/register", function(req, res){
	res.render("register");
});

// handles form logic
router.post("/register", function(req, res){
	//create new user
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, function(err, user){
		if(err){
			console.log(err);
			return res.render("register")
		}
		// remember local could be facebook or twitter login, for 'local', data is saved and retrieved from yelp_camp db
		passport.authenticate("local")(req, res, function(){
			res.redirect("/campgrounds");
		});
	});
});


//show login form
router.get("/login", function(req, res){
	res.render("login");
});
// the middleware handles the authentication before the callback is reached
// handles form logic
router.post("/login", passport.authenticate("local",{
	successRedirect: "/campgrounds",
	failureRedirect: "/login"
}), function(req, res){
	
});

//logout
router.get("/logout", function(req, res){
	req.logout();
	res.redirect("/campgrounds");
});

function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
	
}

module.exports = router;