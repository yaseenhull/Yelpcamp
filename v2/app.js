// var express = require("express");
// var app = express();
// var bodyParser =  require("body-parser");
// var mongoose = require("mongoose")

var express 		= require("express"),
	app 			= express(),
	bodyParser 		=  require("body-parser"),
	mongoose 		= require("mongoose");

///////////////////////////////
// INSTALL MONGOOSE AND SETUP//
///////////////////////////////

mongoose.set("useUnifiedTopology", true);
mongoose.connect("mongodb://localhost/yelp_camp",  { useNewUrlParser: true });

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

////////////////////////////////
// CREATE SCHEMA AND MODEL /////
////////////////////////////////

var campgroundSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
// 	{
// 		name: "De Hoek",
// 		image: "https://etoshanationalpark.co.za/wp-content/uploads/sites/16/2019/06/Onguma-Tamboti-Campsite.jpg",
// 		description: "This is a remotely situated campsite in the basin of kango hills"
		
// 	}, function(err, campground){
// 		if(err){
// 			console.log(err);
// 		} else {
// 			console.log("Newly created campground");
// 			console.log(campground);
// 		}
// 	});

app.get("/", function(req, res){
	res.render("landing");
});
// INDEX route - show all campgrounds
app.get("/campgrounds", function(req, res){
	// Get all campgrounds from DB then run call back function
	Campground.find({}, function(err, allcampgrounds){
		if(err){
			console.log(err)
		} else {
			res.render("index", {campgrounds:allcampgrounds});
		}
	});
	// res.render("campgrounds", {campgrounds: campgrounds});
});


//CREATE - add new campground to DB
app.post("/campgrounds", function(req, res){
	// get data from form and add to campground array
	var name = req.body.name;
	var image = req.body.image;
	var description = req.body.description;
	var newCampground = {name: name, image: image, description: description}
	
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
app.get("/campgrounds/new", function(req, res){
	res.render("new.ejs");
});

// must be below campgrounds/new
// SHOW route - shows more info about one campground
app.get("/campgrounds/:id", function(req, res){
	//find the campground with provided ID
	Campground.findById(req.params.id, function(err, foundCampground ){
		if(err){
			console.log(err);
		} else {
			//render show template with that campground, in show.ejs the variable is called campground and in app.js its called foundCampground
			res.render("show", {campground: foundCampground});
		}
	});
	
});

app.listen(process.env.PORT || 3000, process.env.IP, function(){
	console.log("The Yelpcamp Server has started");
});