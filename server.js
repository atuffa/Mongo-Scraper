// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var exphbs = require("express-handlebars");
var mongoose = require("mongoose");


// Require request and cheerio. This makes the scraping possible
var axios = require("axios");
var cheerio = require("cheerio");

// Require all our models
var db = require("./models");

var PORT = 3000;

// Initialize Express
var app = express();


// Configure middlewares

// Use morgan logger for logging requests
app.use(logger("dev"));
// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true }));
// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));
app.use(express.static('views/images'));
// Set Handlebars as the default templating engine.
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


// connect to MongoDB
mongoose.connect("mongodb://localhost/MongoScraper");
// mongoose.connect("mongodb://localhost/week18Populater");



// Routes

// A route to scrape the NYTimes
app.get("/scrape", function(req, res) {

    axios.get("https://www.nytimes.com/").then(function(response){

        // we load it cherio and save in $ for shorthand selector
        let $ = cheerio.load(response.data);

        // now we grab all the h2 element with the storyheading class
        $("h2.story-heading").each(function(i, element){

            // create an empty object to store the scrapped data's
            let result = {}
           

            // store the title and link as a properties in result 
            result.title = $(this).children("a").text()
            result.link = $(this).children("a").attr("href");

            // console.log(result)
            
            // Create a new article using the result object
            db.Article.create(result)
            .then(function(dbArticle) {
                // View the added result in the console
                console.log(dbArticle);
                
            })
            .catch(function(err) {
                // If an error occurred, send it to the client
                return res.json(err);
            });
        });  
    });
    res.send("Scraping Completed");
});

// A Route to get all articles
app.get("/home", function(req, res) {

    // Grab all the articles from the data base
    db.Article.find({})
    .then(function(dbArticle){
        console.log(dbArticle)
        // If Succesfull render it on on the home page
        res.render("home", {result: dbArticle});
    })
    .catch(function(err){
        // If an error occured, send it to the client
    })
});



// Listen on port 3000
app.listen(3000, function() {
    console.log("App running on port 3000!");
  });
  