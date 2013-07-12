var express = require('express');
var server = express();
var path = require('path');
var io = require('socket.io').listen(server);

server.listen(80);

server.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});
server.use(express.static(path.join(__dirname, 'public')));
server.use(express.static('/socket.io', path.join(__dirname, 'node_modules')));

io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});

// var app = require('http').createServer(handler)
//   , io = require('socket.io').listen(app)
//   , fs = require('fs')
//   , leap = require('leapjs')
//   , time = require("timers");

// app.listen(3000);
// var controller = new leap.Controller({enableGestures: true});

// function handler (req, res) {
//   fs.readFile(__dirname + '/index.html',
//   function (err, data) {
//     if (err) {
//       res.writeHead(500);
//       return res.end('Error loading index.html');
//     }

//     res.writeHead(200);
//     res.end(data);
//   });
// }

// var registerOpen = true;

// io.sockets.on('connection', function (socket) {

//     controller.loop(function(frame) {
// 	    if(frame.gestures.length > 0 && frame.gestures[0].type == "circle" && registerOpen == true)
// 	    {
// 	     	socket.emit('drop');
// 	      registerOpen = false; 
// 	      time.setTimeout(
// 	        function()
// 	        {
// 	          registerOpen = true;
// 	        },
// 	        1000);
// 	    }
// 	    if(frame.pointables[0])
// 	    {
// 	    	var pos = String(frame.pointables[0].tipPosition).split(",");
// 	    	for(i in pos)
// 	    	{
// 	    		pos[i] = pos[i]/1000;
// 	    	}
// 	      socket.emit('data', {'xPos' : pos[0], 'zPos' : pos[1], 'yPos' : pos[2]});
// 	    }


    
// });

// });
