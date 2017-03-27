'use strict';

// NODE MODULES
const Hapi = require('hapi'); // server module
const Good = require('good'); // logging module
const Joi = require('joi'); // input validation module
const mongoose = require('mongoose');
const db = mongoose.connect('mongodb://localhost/bookAPI');

// MODELS
const Book = require('./models/book');

// LOCAL VARS
const PORT = process.env.PORT || 3003;
const serverConfig = { 
    debug: { 
        request: ['error'] 
    } 
};
const connectionConfig = { 
    port: PORT, 
    host: 'localhost' 
};

// initialize server config
const server = new Hapi.Server(serverConfig);
server.connection(connectionConfig);


// ROUTE HANDLERS
server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        reply('Hapi API is up!');
    }
});

server.route({
    method: 'GET',
    path: '/api/books/{id?}',
    handler: function(request, reply) {
        if(request.params.id) {
            Book.findById(request.params.id, function(err, book) {
                if(err) {
                    //console.log(err)
                    reply(err);
                } else {
                    reply(book);
                }
            });
        } else {
            Book.find(function(err, books) {
                if(err) {
                    //console.log(err)
                    reply(err);
                } else {
                    reply(books);
                }
            });
        }
    }
});

server.route({
    method: 'GET',
    path: '/{name}',
    handler: function (request, reply) {
        reply('Greetings, ' + encodeURIComponent(request.params.name) + '!');
    }
});

// register middleware plugins
server.register({
    register: Good,
    options: {
        reporters: {
            console: [{
                module: 'good-squeeze',
                name: 'Squeeze',
                args: [{
                    response: '*',
                    log: '*'
                }]
            }, {
                module: 'good-console'
            }, 'stdout']
        }
    }
}, (err) => {
    // something bad happened loading the plugin
    if (err) {
        throw err; 
    }
    // start the server and log info
    server.start((err) => {
        if (err) {
            throw err;
        }
        server.log('info', 'Server running at: ' + server.info.uri);
    });
});

// END OF LINE
