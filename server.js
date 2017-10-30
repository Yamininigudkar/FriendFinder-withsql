// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
//var friends = require('./app/data/friends.js');
var htmlRoutes = require("./app/routing/htmlRoutes.js")
var apiRoutes = require("./app/routing/apiRoutes")




// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Setting html and api routes
//===============================================================
htmlRoutes.htmlRoutes(app)
apiRoutes.apiRoutes(app)



// Starts the server to begin listening
// =============================================================
app.listen(PORT, function()
{
	console.log("App listening on PORT " + PORT);
});
