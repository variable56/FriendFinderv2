//Links to data file that stores the JSON object for all the friends in the "database"
var friendObject = require("../data/friends");

//this exports the file so that we can use it in other files for this project
module.exports = function (app) {

    //This is the route for printing the entire JSON object to the screen within the browser
    app.get("/api/friends", function (req, res) {
        res.json(friendObject);
        // friendObject.push({name: "test", photo: "www.google.com", scores: [1,2,3,4,5,6,7,8,9,10]});
    });


    app.post("/api/friends", function (req, res) {

        //This is the object we will use to determine which friend will be the best match in the database
        var match = {
            name: "",
            picture: "",
            difference: 1000
        };

        // console.log(req.body);

        //variables for the user response and the match response from friends.js
        var userResponse = req.body;
        var userScore = userResponse.scores;

        // console.log(userScore);

        //This is the variable to store the difference between the user score and the scores of those in the database
        var comparison = 0;

        for (i = 0; i < friendObject.length; i++) {
            
            console.log(friendObject[i]);
            comparison = 0;



            //Another loop is necessary to loop through the scores and add them up
            for (j = 0; j < friendObject[i].scores[j]; j++) {
                comparison += Math.abs(parseInt(userScore[j]) - parseInt(friendObject[i].scores[j]));   
            }
            if (comparison <= match.difference) {
                match.name = friendObject[i].name;
                match.picture = friendObject[i].photo;
                match.difference = comparison;
            };
        }
        //after looping through the JSON object for friends and the loop within it to add up the user score, we then push to the friends.js JSON object
        friendObject.push(req.body);
        

        //returns JSON object to the html. This will populate the modal.
        res.json(match);

    });
}