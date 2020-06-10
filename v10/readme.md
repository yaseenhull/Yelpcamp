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

INDEX 	/campgrounds
NEW 	/campgrounds/new
CREATE	/campgrounds
SHOW	/campgrounds/:id

NEW		campgrounds/:id/comments/new	GET
CREATE	campgrounds/:id/comments		POST

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
	* campgrounds and comments are linked and we can do this by nesting routes
* Add the comment new and create routes
* Add the new comment form

#Style Show Page
* Add sidebar to show page
* Display comments nicely
* Add public directory
* Add custom stylesheet

##Auth Pt. 1 - Add User Model
* Install all packages needed for auth
* Define User model

##Auth Pt. 2 - Register
* Configure Passport
* Add register routes
* Add register template

##Auth Pt. 3 - Login
* Add login routes
* Add login template

##Auth Pt. 4 - Logout/Navbar
* Add logout routes
* Prevent user from adding a comment if not signed in 
* Add links to navbar
* Show/hide auth links correctly

##Refactor the routes
* Use express router to reorganize all routes

##Users + Comments
* Associate users and comments
* Save author's name to a comment automatically

##Users + Campgrounds
* Prevent an unauthenticated user from creating a campgrounds
* Save username+id to newly created campground

#Editing Campgrounds
* Add Method-Override
* Add Edit Route for Campgrounds
* Add link to edit page
* Add update route 
* Fix $set problem

#Deleting Campgrounds
* Add Destroy Route
* Add Delete button

#Authentication - finding out if some is who they say they are

#Authorization - what are users permitted to do
* User can only edit his/her campgrounds
* User can only delete his/her campgrounds
* Hide/Show edit and delete buttons

#Editting Comments
* Add Edit route for comments
* Add Edit buttons
* Add Update route

Campground Edit Route: /campgrounds/:id/edit
Comment Edit Route: /campgrounds/:id/comments/:comment_id/edit

#Deleting Comments
* Add Destroy route
* Add Delete buttons

Campground Destroy Route: /campgrounds/:id
Comment Destroy Route: /campgrounds/:id/comments/:comment_id

#Authorization Pt. 2: Comments
* User can only edit his/her comments
* User can only delete his/her comments
* Hide/Show edit and delete buttons
* Refactor Middleware
