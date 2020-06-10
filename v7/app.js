// var express = require("express");
// var app = express();
// var bodyParser =  require("body-parser");
// var mongoose = require("mongoose")

//require packages
var express 		= require("express"),
	app 			= express(),
	bodyParser 		= require("body-parser"),
	mongoose 		= require("mongoose"),
	passport		= require("passport"),
	LocalStrategy 	= require("passport-local"),
	Comment			= require("./models/comment"),
	Campground		= require("./models/campground"),
	User			= require("./models/user"),
	seedDB			= require("./seeds");

// requiring routes
var commentRoutes 		= require("./routes/comments"),
	campgroundRoutes 	= require("./routes/campgrounds"),
	indexRoutes 		= require("./routes/index");
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

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);


app.listen(process.env.PORT || 3000, process.env.IP, function(){
	console.log("The Yelpcamp Server has started");
});