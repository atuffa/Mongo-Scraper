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

app.use(express.static("views/js"));
app.use(express.static('views/images'));
// Set Handlebars as the default templating engine.
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


// // connect to MongoDB
// mongoose.connect("mongodb://localhost/MongoScraper");
// mongoose.connect("mongodb://localhost/week18Populater");

// Database configuration
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/MongoScraper";
mongoose.connect(MONGODB_URI);
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);


// Routes

// A route to scrape the NYTimes
app.get("/scrape", function(req, res) {

    axios.get("https://www.nytimes.com/").then(function(response){

        // we load it cherio and save in $ for shorthand selector
        let $ = cheerio.load(response.data);

        // now we grab all the h2 element with the storyheading class
        $("article.story").each(function(i, article){

            // create an empty object to store the scrapped data's
            let result = {}
           
           // 
            const news = $(article).children('.story-heading')
           
            // store the title and link as a properties in result 
            result.title = news.text().trim()
            result.link = news.children('a').attr('href');
            
            // store summary and filter
            const content = $(article).children('.summary').text().trim()
            if (content === "") {
                return 
            }else{
                result.content = content
            }

            console.log(result)
            
            // // Create a new article using the result object
            // db.Article.create(result)
            // .then(function(dbArticle) {

            //     // View the added result in the console
            //     console.log(dbArticle);
            // })
            // .catch(function(err) {

            //     // If an error occurred, send it to the client
            //     return res.json(err);
            // });
        });  
    });
    // res.send("Scraping Completed");
});

// A Route to get all articles
app.get("/", function(req, res) {

    // Grab all the articles from the data base
    db.Article.find({})
    .then(function(dbArticle){

        // console.log(dbArticle)
        // If Succesfull render it on on the home page
        res.render("home", {result: dbArticle});
    })
    .catch(function(err){
        // If an error occured, send it to the client
    })
});

// // Updating 
app.get("/article/:id", function(req, res){

    db.Article.findOneAndUpdate({ _id: req.params.id }, { saved: true }, { new: true })
    .then(function(dbArticle){

        // console.log(dbArticle)
        // send it back to the client if succesfull
        res.json(dbArticle)

    }).catch(function(err){

        // send the err back if the error 
        res.json(err)
    })
});


// saved page route and populate it with the asscoiated note
app.get("/saved", function(req, res) {

    // Grab all the articles from the data base
    db.Article.find({"saved": true}).populate("note")
    .then(function(dbArticle){

        console.log(dbArticle)
        // If Succesfull render it on on the home page
        res.render("saved", {result: dbArticle});
    })
    .catch(function(err){
        // If an error occured, send it to the client
    })
});

// post 
app.post("/article/:id", function(req, res){
    db.Note.create(req.body)
    .then(function(dbNote){
        console.log(dbNote)
        return db.Article.findOneAndUpdate({_id:req.params.id}, {note: dbNote._id}, {new:true}).populate("note")
    })
    .then(function(dbArticle) {

        // If we were able to successfully update an Article, send it back to the client
        console.log(dbArticle)
        // res.redirect("/saved");
        
    })
      .catch(function(err) {

        // If an error occurred, send it to the client
        res.json(err);
    });
})

// delete from saved
app.get("/articles/:id", function(req, res){

    db.Article.findOneAndUpdate({ _id: req.params.id }, { saved: false}, { new: true })
    .then(function(dbArticle){

        console.log(dbArticle)
        // send it back to the client if succesfull
        res.json(dbArticle)

    }).catch(function(err){

        // send the err back if the error 
        res.json(err)
    })
});

// // delete from notes
app.get("/note/:id", function(req, res) {

    console.log(req.params.id)
    // Grab all the articles from the data base
    db.Article.findById(req.params.id, function(err, user){

        if(err) throw err;
        console.log('findByIdAndRemove doc: ', user);

        // grab the note and delete it
        db.Note.findByIdAndRemove(user.note, function(err2, docs) {
            console.log('Finding all: ', docs)
          })
    });
    
});


// Listen on port 3000
app.listen(process.env.PORT || 3000, function() {
    console.log('App running on port 3000!');
});