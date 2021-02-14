// Setup empty JS object to act as endpoint for all routes
const projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
var app = express();

/* Middleware*/
const bodyParser = require("body-parser");

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 3000;
const server = app.listen(port, ()=> {
    console.log("server is running")
    console.log(`running on localhost:${port}`);
});
//post route
const data=[];

app.post("/addtemp", addTemp)

function addTemp(req, res){    
        projectData.date = req.body.date,
        projectData.temperature = req.body.temperature,
        projectData.content= req.body.feelings,
    res.send(projectData)
};

// GET request
app.get('/allinfo', getData)
function getData(req, res){
    res.send(projectData)
}