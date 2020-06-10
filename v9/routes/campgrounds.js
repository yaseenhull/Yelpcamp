var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
////////////////////////
// CAMPGROUNDS ROUTES
///////////////////////


// INDEX route - show all campgrounds
router.get("/", function(req, res){
	//if logged in req.user holds user object
	//console.log(req.user)
	// Get all campgrounds from DB then run call back function
	Campground.find({}, function(err, allcampgrounds){
		if(err){
			console.log(err)
		} else {
			res.render("campgrounds/index", {campgrounds:allcampgrounds});
		}
	});
	// res.render("campgrounds", {campgrounds: campgrounds});
});


//CREATE - add new campground to DB
router.post("/", isLoggedIn, function(req, res){
	// req info from form
	var name = req.body.name;
	var image = req.body.image;
	var description = req.body.description;
	var author = {
		id: req.user._id,
		username: req.user.username
	}
	var newCampground = {name: name, image: image, description: description, author: author}
	
	Campground.create(newCampground, function(err, newlyCreated){
		if(err){
			console.log(err);
		} else {
			res.redirect("/campgrounds");
			console.log("Newly created campground");
			console.log(newlyCreated);
		}
	});
	
	//campgrounds.push(newCampground);
	// redirect back to campgrounds page
	
});
// NEW route - show form to create new campground
router.get("/new", isLoggedIn, function(req, res){
	res.render("campgrounds/new");
});

// must be below campgrounds/new
// SHOW route - shows more info about one campground
router.get("/:id", function(req, res){
	//find the campground comments with provided ID
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground ){
		if(err){
			console.log(err);
		} else {
			//render show template with that campground, in show.ejs the variable is called campground and in app.js its called foundCampground
			res.render("campgrounds/show", {campground: foundCampground});
		}
	});
	
});

function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
	
}

module.exports = router;
