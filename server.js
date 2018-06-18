// Dependencies
var express = require("express");
var mongojs = require("mongojs");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");

// Require request and cheerio. This makes the scraping possible
var request = require("request");
var cheerio = require("cheerio");


// Initialize Express
var app = express();

// Database configuration
// var databaseUrl = "scraper";
// var collections = ["scrapedData"];

// Use morgan logger for logging requests
// app.use(logger("dev"));
// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true }));
// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));
app.use(express.static('views/images'));

// Set Handlebars as the default templating engine.
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


// Hook mongojs configuration to the db variable
// var db = mongojs(databaseUrl, collections);
// db.on("error", function(error) {
//   console.log("Database Error:", error);
// });

// Main route (simple Hello World Message)
app.get("/", function(req, res) {
  res.send("Hello world");
});

// Retrieve home page from the db
app.get("/home", function(req, res) {


    let result = [
        {
            id:1,
            title:"Trump and Kim jung un meet in singapor",
            body:"Pariatur tempor adipisicing sit qui esse labore.Adipisicing ad anim excepteur ad ipsum ipsum fugiat.",
            saved:false
        },
        {
            id:2,
            title:"Dr. Abiy is on Fire",
            body:"Pariatur tempor adipisicing sit qui esse labore.Adipisicing ad anim excepteur ad ipsum ipsum fugiat.",
            saved:false
        },
        {
            id:3,
            title:"ANC choose new chair person",
            body:"Pariatur tempor adipisicing sit qui esse labore.Adipisicing ad anim excepteur ad ipsum ipsum fugiat.",
            saved:true
        }
    ];

    let data = {
        result
    }
    res.render("home", data);
    

  // Find all results from the scrapedData collection in the db
//   db.scrapedData.find({}, function(error, found) {
//     // Throw any errors to the console
//     if (error) {
//       console.log(error);
//     }
//     // If there are no errors, send the data to the browser as json
//     else {
//       res.json(found);
//     }
//   });
});

// Retrieve saved articles from the db
app.get("/saved", function(req, res) {


    let result = [
        {
            id:1,
            title:"Trump and Kim jung un meet in singapor",
            body:"Pariatur tempor adipisicing sit qui esse labore.Adipisicing ad anim excepteur ad ipsum ipsum fugiat.",
            saved:false
        },
        {
            id:2,
            title:"Dr. Abiy is on Fire",
            body:"Pariatur tempor adipisicing sit qui esse labore.Adipisicing ad anim excepteur ad ipsum ipsum fugiat.",
            saved:false
        },
        {
            id:3,
            title:"ANC choose new chair person",
            body:"Pariatur tempor adipisicing sit qui esse labore.Adipisicing ad anim excepteur ad ipsum ipsum fugiat.",
            saved:true
        }
    ];

    let data = {
        result
    }
    res.render("saved", data);
    

  // Find all results from the scrapedData collection in the db
//   db.scrapedData.find({}, function(error, found) {
//     // Throw any errors to the console
//     if (error) {
//       console.log(error);
//     }
//     // If there are no errors, send the data to the browser as json
//     else {
//       res.json(found);
//     }
//   });
});

// Listen on port 3000
app.listen(3000, function() {
    console.log("App running on port 3000!");
  });
  