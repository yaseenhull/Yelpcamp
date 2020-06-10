// var express = require("express");
// var app = express();
// var bodyParser =  require("body-parser");
// var mongoose = require("mongoose")

var express 		= require("express"),
	app 			= express(),
	bodyParser 		=  require("body-parser"),
	mongoose 		= require("mongoose"),
	Comment			= require("./models/comment"),
	Campground		= require("./models/campground"),
	seedDB			= require("./seeds");
///////////////////////////////
// INSTALL MONGOOSE AND SETUP//
///////////////////////////////

mongoose.set("useUnifiedTopology", true);
mongoose.connect("mongodb://localhost/yelp_camp",  { useNewUrlParser: true });

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

seedDB();

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
			res.render("campgrounds/index", {campgrounds:allcampgrounds});
		}
	});
	// res.render("campgrounds", {campgrounds: campgrounds});
});


//CREATE - add new campground to DB
app.post("/campgrounds", function(req, res){
	// req info from form
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
	res.render("campgrounds/new");
});

// must be below campgrounds/new
// SHOW route - shows more info about one campground
app.get("/campgrounds/:id", function(req, res){
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

//======================================
	//COMMENTS ROUTES
//======================================
app.get("/campgrounds/:id/comments/new", function(req,res){
	// find campground by id
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err)
		} else {
			res.render("comments/new", {campground: campground});
		}
	});
	
});

app.post("/campgrounds/:id/comments", function(req, res){
	//lookup campground using ID
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err);
		} else {
			//console.log(req.body.comment)
			Comment.create(req.body.comment, function(err, comment){
				if(err){
					console.log(err);
				} else {
					campground.comments.push(comment);
					campground.save();
					res.redirect("/campgrounds/" + campground._id);
				}
			})
		}
	})
	//create new comments
	//connect new campground to campground
	//redirect campground show page
})


app.listen(process.env.PORT || 3000, process.env.IP, function(){
	console.log("The Yelpcamp Server has started");
});