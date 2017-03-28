/*
    @name models/audioBook.js
    @summary Mongoose ORM Audio Book Model schema definition
*/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AudioBookModel = new Schema({
    title: { type: String },
    year: { type: String },
    author: { type: String },
    authorUrl: { type: String },
    publisher: { type: String },
    summary: { type: String },
    details: { type: String },
    isbn: { type: String },
    url: { type: String }
});

module.exports = mongoose.model('AudioBook', AudioBookModel);

// END OF LINE