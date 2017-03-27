/*
    @name book.js
    @summary Mongoose Book Model schema definition
*/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BookModel = new Schema({
    title: { type: String },
    author: { type: String },
    genre: { type: String },
    read: { type: Boolean, default: false }
});

module.exports = mongoose.model('Book', BookModel);

// END OF LINE
