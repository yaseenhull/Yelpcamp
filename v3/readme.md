#Add Mongoose
* Install and configure Mongoose
* Setup campground model
* Use campground model inside of our routes

#Show Page
* Review the RESTful routes we've seen so far
RESTful routes (7)

name	url			verb	desc.
==================================================
INDEX	/dogs		GET		Display a list of all dogs
NEW		/dog/new	GET		Displays form to make a new dog
CREATE	/dogs		POST	Add new dog to DB
SHOW	/dogs/:id	GET		Shows info about one dog

* Add description to our campground model
* Show db.collection.drop()
deletes all the information in the db
* Add a show route/template

#Refactor Mongoose Code
* Create a models directory
* Use module.export
* Require everything correctly!

#Add Seeds File
* Add a seed.js file
* Run the seeds fle every time the server starts

#Comment New/Create
* Discuss nested routes
* Add the comment new and create routes
* Add the new comment form
