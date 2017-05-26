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
var mqtt = require('mqtt')

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
const server = app.listen(PORT, 'localhost' ,function() {
	console.log("Node.js server running on port %s", PORT);
});

const io = require('socket.io')(3001);
io.set('transports', ['websocket']);


// Set socket.io listeners.
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('shutdown', (message) =>{
   console.log("Publishing Shutdown")
   client.publish("shutdown", message)
	});

   socket.on('stop', (message) =>{
	console.log("Publishing stop")
   client.publish("stop", message)
});
});




console.log("Connecting client...")
var client  = mqtt.connect('mqtt://localhost:1883',{
  protocolId: 'MQIsdp',
  protocolVersion: 3
});


client.on('connect', function () {
  console.log("connected")
  client.subscribe('temperature')
  client.subscribe('shutdown_ack')
  client.subscribe('stop_ack')
  client.subscribe('sense_feed')
  client.publish('controls', 'Hello mqtt')
})
 
client.on('message', function (topic, message) {
  // message is Buffer 
  if(topic == 'sense_feed'){
  	io.sockets.emit('sense_feed', message)
  }
  console.log(message.toString())
  io.sockets.emit('data', {message: message.toString()})
  console.log('emitted data')
})


app.get('/hi', function (req, res) {
  res.send('Hello World!')
})

