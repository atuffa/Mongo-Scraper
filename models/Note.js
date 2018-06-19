// incorporating the required dependecies
let mongoose = require("mongoose");

// Save a reference to the Schema constructor
let Schema = mongoose.Schema;

// Using the schema constructor create a new UserSchema
let NoteSchema = new Schema({

    // title is a string type property
    title: String,

    // body is a string type property
    body: String
});

// this allows the us to create a model
// from the note Schema, using the mongoose model method

let Note = mongoose.model("Note", NoteSchema);

// Export the note model
module.exports = Note;