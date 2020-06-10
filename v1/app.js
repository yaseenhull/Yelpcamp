var express = require("express");
var app = express();
var bodyParser =  require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var campgrounds= [
		{name: "laangebaan", image:"https://images.unsplash.com/photo-1492648272180-61e45a8d98a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"},
		{name: "De Hoek", image:"https://etoshanationalpark.co.za/wp-content/uploads/sites/16/2019/06/Onguma-Tamboti-Campsite.jpg"},
		{name: "silver mines", image:"https://turntable.kagiso.io/images/camp.width-800.jpg"}
	]

app.get("/", function(req, res){
	res.render("landing");
});

app.get("/campgrounds", function(req, res){

	res.render("campgrounds", {campgrounds: campgrounds});
});

//rest convention followed - more on this later
app.post("/campgrounds", function(req, res){
	// get data from form and add to campground array
	var name = req.body.name;
	var image = req.body.image;
	var newCampground = {name: name, image: image}
	campgrounds.push(newCampground);
	// redirect back to campgrounds page
	res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res){
	res.render("new.ejs");
});

app.listen(process.env.PORT || 3000, process.env.IP, function(){
	console.log("The Yelpcamp Server has started");
});