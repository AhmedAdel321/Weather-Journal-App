// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');


// Start up an instance of app
const app=express();



/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port =3333;
app.listen(port, function() {
    console.log(`server is running and listen to port ${port}`);
    
});

app.get('/get',function(req,res){

    res.send(projectData);
    //projectData={}; ///
});

app.post('/data',function(req,res){
    console.log(req.body);
    projectData={
        temp:req.body.temp,
        date:req.body.date,
        content:req.body.content
    }

});




//npm init -y
//npm i express body-parser cors
// node server.js
// ctrl + C to stop server
// npm i nodemon--save-dev

