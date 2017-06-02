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
   socket.on('ping', (message) =>{
	console.log("Publishing ping")
   client.publish("ping", message)
	});
   socket.on('reset', (message) =>{
	console.log("Publishing reset")
   client.publish("reset", message)
	});
   socket.on('rotate_left', (message) =>{
	console.log("Publishing rotate_left")
   client.publish("rotate_left", message)
	});
    socket.on('rotate_right', (message) =>{
	console.log("Publishing rotate_right")
   client.publish("rotate_right", message)
	});
	socket.on('flag_pole', (message) =>{
	console.log("Publishing flag_pole")
   client.publish("flag_pole", message)
	});
	socket.on('shake', (message) =>{
	console.log("Publishing shake")
    client.publish("shake", message)
	});
	socket.on('itinerary', (message) =>{
	console.log("Publishing itinerary")
	console.log(message);
    client.publish("itinerary", message)
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
  client.subscribe('altitude')
  client.subscribe('abs_pressure')
  client.subscribe('sea_pressure')
  client.subscribe('humidity')
  client.subscribe('voltage')
  client.subscribe('magnetometer')

  client.subscribe('shutdown_ack')
  client.subscribe('stop_ack')
  client.subscribe('sense_feed_color')
  client.subscribe('sense_feed_depth')
  client.subscribe('imu')

  client.publish('controls', 'Hello mqtt')
})
 
client.on('message', function (topic, message) {
  if(topic == 'temperature'){
  	console.log('altitude ' + message.toString())
  	io.sockets.emit('temperature', message.toString())
  	return;
  }
  if(topic == 'altitude'){
  	console.log('altitude ' + message.toString())
  	io.sockets.emit('altitude', message.toString())
  	return;
  }
  if(topic == 'abs_pressure'){
  	console.log('abs_pressure ' + message.toString())
  	io.sockets.emit('abs_pressure', message.toString())
  	return;
  }
  if(topic == 'sea_pressure'){
  	console.log('sea_pressure ' + message.toString())
  	io.sockets.emit('sea_pressure', message.toString())
  	return;
  }
  if(topic == 'humidity'){
  	console.log('humidity ' + message.toString())
  	io.sockets.emit('humidity', message.toString())
  	return;
  }
  if(topic == 'voltage'){
  	console.log('voltage ' + message.toString())
  	io.sockets.emit('voltage', message.toString())
  	return;
  }
  if(topic == 'magnetometer'){
  	console.log('magnetometer ' + message.toString())
  	io.sockets.emit('magnetometer', message.toString())
  	return;
  }








  // message is Buffer 
  if(topic == 'sense_feed_color'){
  	io.sockets.emit('sense_feed_color', message)
  	return;
  }
  if(topic == 'sense_feed_depth'){
  	io.sockets.emit('sense_feed_depth', message)
  	return;
  }

  if(topic == 'imu'){
  	console.log('Emit imu ' + message.toString())
  	io.sockets.emit('imu', message.toString())
  	return;
  }
  if(topic == 'gps'){
  	console.log('Emit gps ' + message.toString())
  	io.sockets.emit('gps', message.toString())
  	return;
  }
  console.log(message.toString())
  io.sockets.emit('data', {message: message.toString()})
  console.log('emitted data')
})


app.get('/hi', function (req, res) {
  res.send('Hello World!')
})

