var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");
///////////////////////
// COMMENTS ROUTES
//////////////////////

//comments new
router.get("/new", isLoggedIn, function(req,res){
	// find campground by id
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err)
		} else {
			res.render("comments/new", {campground: campground});
		}
	});
	
});

//comments create
router.post("/", isLoggedIn, function(req, res){
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
					// add username and id to comment
					// req.user._id from current loggedin user 
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					// save comment
					comment.save();
					campground.comments.push(comment);
					campground.save();
					res.redirect("/campgrounds/" + campground._id);
				}
			});
		}
	});
	//create new comments
	//connect new campground to campground
	//redirect campground show page
});

function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
	
}

module.exports = router;
