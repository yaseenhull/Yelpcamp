var Campground = require("../models/campground");
var Comment = require("../models/comment");
// all middleware goes here
var middlewareObj = {};

middlewareObj.checkedCampgroundOwnership = function(req, res, next){
	if(req.isAuthenticated()){
		// finds current id of logged in user and sets it to foundCampground
		Campground.findById(req.params.id, function(err, foundCampground){
			if(err){
				// takes user back to the previous page they were on
				req.flash("error", "Campground not found");
				res.redirect("back");
			} else {
				// does user own the campground? compares mongoose author id object of ccurrent campground is compared with the current user logged in
				if(foundCampground.author.id.equals(req.user._id)) {
					next();		
				} else {
					req.flash("error", "You don't have permission to do that");
					res.redirect("back");
				}
			}
		});
		
	} else {
		req.flash("error", "You need to be logged in to do that");
		res.redirect("back");
	}	
}

middlewareObj.checkedCommentOwnership = function(req, res, next) {
	// does user have a an account and logged in ?
	if(req.isAuthenticated()){
		// finds current id of logged in user and sets it to foundCampground
		Comment.findById(req.params.comment_id, function(err, foundComment){
			if(err){
				// takes user back to the previous page they were on
				res.redirect("back");
			} else {
				// does user own the comment? compares mongoose author id object of current comment is compared with the current user id logged in
				if(foundComment.author.id.equals(req.user._id)) {
					next();		
				} else {
					req.flash("error", "You don't have permission to do that");
					res.redirect("back");
				}
			}
		});
		
	} else {
		req.flash("error", "You need to be logged in to do that");
		res.redirect("back");
	}											  
}

middlewareObj.isLoggedIn = function(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	//key: error, message: Please login first!
	// this only occurs if user is not logged, doesn't pass conditional test above
	req.flash("error", "You need to be logged in to do that");
	res.redirect("/login");
	
}

module.exports = middlewareObj