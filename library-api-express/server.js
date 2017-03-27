/*
    @name server.js
    @summary Express API server
*/

// NODE MODULES
var express = require('express');
var mongoose = require('mongoose');

var db = mongoose.connect('mongodb://localhost/libraryAPI');
var server = express();
var port = process.env.PORT || 3003;

// MODELS
var Book = require('./models/book');

var bookRouter = express.Router();

bookRouter.route('/books')
    .get(
        function getAllBooks(request, response) {
            Book.find(function(err, books) {
                if(err) {
                    response.status(500).send(err);
                } else {
                    response.json(books);
                }
            });
        }
    );

server.use('/api', bookRouter);

server.get('/', function defaultRouterHandler(request, response) {
    response.send('Library API (Express) is up!');
});

server.listen(port, function startServer() {
    console.log(' Dev Server running at http://localhost:' + port);
});

// END OF LINE
