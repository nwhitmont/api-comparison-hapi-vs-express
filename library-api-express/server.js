/*
    @name server.js
    @summary Express API server
*/

// NODE MODULES
var express = require('express'); // express server framework
var mongoose = require('mongoose'); // MongoDB ORM module
var bodyParser = require('body-parser'); // express body parser middleware

// LOCAL VARS
var db = mongoose.connect('mongodb://localhost/libraryAPI');
var server = express();
var port = process.env.PORT || 3003;

// MODELS
var Book = require('./models/book');

// init body-parser middleware
server.use(bodyParser.json()); // handle JSON objects
server.use(bodyParser.urlencoded({extended: true}));

// setup /books router
var bookRouter = express.Router();

// configure route handlers
bookRouter.route('/books')
    .post(
        function createNewBook(request, response) {
            var newBook = new Book(request.body);
            // save the new book to db
            newBook.save();
            // reply success with newBook JSON
            response.json(newBook);
        }
    )
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

bookRouter.route('/books/:id')
    .get(
        function getBookById(request, response) {
            Book.findById(request.params.id, function(err, book) {
                if(!err) response.json(book);
                else response.status(500).send(err);
            });
        }
    );

server.use('/api', bookRouter);

server.get('/', function defaultRouterHandler(request, response) {
    response.send('Library API (Express) is up!');
});

server.listen(port, function startServer() {
    console.log(`Dev Server running at http://localhost:${port}`);
});

// END OF LINE
