
//var friends = require('../data/friends.js');
//Connecting to database
//================================================================
var mysql = require("mysql");

var connection;
if(process.env.JAWSDB_URL)
{
	connection= mysql.createConnection(process.env.JAWSDB_URL);
}else 
{
	connection= = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "northwestern12@",
	database: "friend_finder_db"
});
	
}
 
connection.connect(function(err) {
	if (err) {
		console.error("error connecting: " + err.stack);
		return;
	}

	console.log("connected as id " + connection.threadId);
});

var apiRoutes = function(app)
{
	// API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  
  // ---------------------------------------------------------------------------

  
  app.post("/api/survey", function(req, res)
  {
		  // req.body hosts is equal to the JSON post sent from the user
		  // This works because of our body-parser middleware
		  var newfriend = req.body;
		  var newfriendScore = newfriend.scores
		  var totaldifference=[];
		  var scoreDiff=0;
		  var diff = 0;
		  var actualDiff=[]
		  var index = 0;

		  connection.query("SELECT * FROM scores;", function(err, data)
		  {
		  	if (err) throw err;

          
          //Calculating the difference in score for newFriend and each friend in friends array
		  //-----------------------------------------------------------------------------------
			var friendscoreArray = [];
			for (var i = 0; i < data.length; i++)
			{
				friendscoreArray.push(data[i].q1)
				friendscoreArray.push(data[i].q2)
				friendscoreArray.push(data[i].q3)
				friendscoreArray.push(data[i].q4)
				friendscoreArray.push(data[i].q5)
				friendscoreArray.push(data[i].q6)
				friendscoreArray.push(data[i].q7)
				friendscoreArray.push(data[i].q8)
				friendscoreArray.push(data[i].q9)
				friendscoreArray.push(data[i].q10)
				
				  	
				  	for (var j = 0; j < friendscoreArray.length; j++)
				  	{
				  		
				  		scoreDiff += Math.abs(parseInt(newfriendScore[j]) - parseInt(friendscoreArray[j]));
				  		console.log(scoreDiff,"scoreDiff")
				  		
				  		
				  	}
			//Pushing the difference in score in total difference array	
			//------------------------------------------------------------  
			totaldifference.push(scoreDiff)
			friendscoreArray = []
			scoreDiff = 0;


		}
		console.log(totaldifference,"totaldifference")

			 //Finding the best match by finding the least difference value
			 //------------------------------------------------------------------  

			 var value = totaldifference[0];

			 for (var i = 0; i < totaldifference.length; i++)
			 {
			 	if(totaldifference[i]<value)
			 	{
			 		value = totaldifference[i];
			 		index =i ;
			 	}
			 }
			 console.log(index, "index")

			 
		   
	});
	//----------------------------------------------------------------------------------------	  
	//Finding the best match from friends table using the index value received in above query
	//------------------------------------------------------------------------------------------	  

	connection.query("SELECT * FROM friends;", function(err, data)
		  {
		  	if (err) throw err;
		  	res.json(data[index])


		  })		  

		  console.log(newfriend,"New Friend")
		  
//-------------------------------------------------------------------------------------		   
//Inserting the data of the new friend in database
//--------------------------------------------------------------------------------------		   	  
		var answer = []	  
		answer.push(req.body.name)
		answer.push(req.body.photo)
		connection.query("INSERT INTO friends (name,photo) VALUES (?)", [answer], function(err, result)
		{
			if (err) throw err;

		   // res.redirect("/");
		   console.log("database update")
		});
		console.log(req.body.scores)
		connection.query("INSERT INTO scores (q1,q2,q3,q4,q5,q6,q7,q8,q9,q10) VALUES (?)", [req.body.scores], function(err, result) 
		{
			if (err) throw err;

			console.log(req.body.scores)
			console.log("database update")
		})


	});//.post closing


// API to get all friends data
//======================================================================
	app.get("/all/view", function(req, res)
	{
		connection.query("SELECT * FROM friends;", function(err, data) {
			if (err) throw err;


			res.json(data);
		});

	});
}//apiRoutes function

//Exporting apiRoutes function 
//=====================================================================================================================================
module.exports={"apiRoutes":apiRoutes}