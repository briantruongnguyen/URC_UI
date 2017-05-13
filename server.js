/**
 * Introduction to Human-Computer Interaction
 * Lab 1
 * --------------
 * Created by: Michael Bernstein
 * Last updated: December 2013
 */
var PORT = 3000;

// Express is a web framework for node.js
// that makes nontrivial applications easier to build
var express = require('express');

// Create the server instance
var app = express();

// Print logs to the console and compress pages we send
app.use(express.logger());
app.use(express.compress());

// Return all pages in the /static directory
// whenever they are requested at '/'
// e.g., http://localhost:3000/index.html
// maps to /static/index.html on this machine
app.use(express.static(__dirname + '/static'));

// Start the server
app.listen(PORT, 'localhost' ,function() {
	console.log("Node.js server running on port %s", PORT);
});

app.get('/hi', function (req, res) {
  res.send('Hello World!')
})


var net = require('net');

var HOST = '192.168.7.2';
var PORT2 = 3001;

var client = new net.Socket();
client.connect(PORT2, HOST, function() {

    console.log('CONNECTED TO: ' + HOST + ':' + PORT2);
    // Write a message to the socket as soon as the client is connected, the server will receive it as message from the client 
    client.write('Hello');

});

// Add a 'data' event handler for the client socket
// data is what the server sent to this socket
client.on('data', function(data) {
    
    console.log('DATA: ' + data);
    
});

// Add a 'close' event handler for the client socket
client.on('close', function() {
    console.log('Connection closed');
});