// var express = require("express");
// var app = express();
// var bodyParser =  require("body-parser");
// var mongoose = require("mongoose")

var express 		= require("express"),
	app 			= express(),
	bodyParser 		=  require("body-parser"),
	mongoose 		= require("mongoose"),
	passport		= require("passport"),
	LocalStrategy 	= require("passport-local"),
	Comment			= require("./models/comment"),
	Campground		= require("./models/campground"),
	User			= require("./models/user"),
	seedDB			= require("./seeds");
///////////////////////////////
// INSTALL MONGOOSE AND SETUP//
///////////////////////////////

mongoose.set("useUnifiedTopology", true);
mongoose.connect("mongodb://localhost/yelp_camp",  { useNewUrlParser: true });

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
// for css directory, include in header after
app.use(express.static(__dirname + "/public"));
//console.log(__dirname);
seedDB();

///////////////////////////////////
// PASSPORT CONFIGURATION
///////////////////////////////////
app.use(require("express-session")({
	secret: "Once again Sage wins cutest dog",
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//this will handle currentUser in header for each route, checking whether a user is logged in or not
app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	next();
});

////////////////////////
// ROUTES
///////////////////////
app.get("/", function(req, res){
	res.render("landing");
});
// INDEX route - show all campgrounds
app.get("/campgrounds", function(req, res){
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

///////////////////////
// COMMENTS ROUTES
//////////////////////
app.get("/campgrounds/:id/comments/new", isLoggedIn, function(req,res){
	// find campground by id
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err)
		} else {
			res.render("comments/new", {campground: campground});
		}
	});
	
});

app.post("/campgrounds/:id/comments", isLoggedIn, function(req, res){
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

/////////////////
// AUTH ROUTES
/////////////////

//show register form
app.get("/register", function(req, res){
	res.render("register");
});

app.post("/register", function(req, res){
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
app.get("/login", function(req, res){
	res.render("login");
});
// the middleware handles the authentication before the callback is reached
app.post("/login", passport.authenticate("local",{
	successRedirect: "/campgrounds",
	failureRedirect: "/login"
}), function(req, res){
	
});

//logout
app.get("/logout", function(req, res){
	req.logout();
	res.redirect("/campgrounds");
});

function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
	
}

app.listen(process.env.PORT || 3000, process.env.IP, function(){
	console.log("The Yelpcamp Server has started");
});