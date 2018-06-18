// incorporate required dependecies
let mongoose = require("mongoose");

// Save a reference to the Schema constructor
let Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
let ArticleSchema = new Schema({

    // title is required and its a string type
    title:{
        type: String,
        required: true
    },

    // title is required and its a string type
    link:{
        type: String,
        required: true
    },

    // note is an object that stores a Note id
    // the ref property links the Object.Id with to the Note model
    // this allows to populate the Article with the associated note
    note:{
        type: Schema.Types.ObjectId,
        ref: "Note"
    }
});

// this allows us to create our model from the above Schema, using mongoose model method
let Article = mongoose.model("Article", ArticleSchema)


// Export the Article model
module.exports = Article;