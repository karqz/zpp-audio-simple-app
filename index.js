'use strict';

var nodeStatic = require('node-static');
var http = require('http');
var socketIO = require('socket.io');

// Create socketIO server:

var fileServer = new(nodeStatic.Server)();
var app = http.createServer(function(req, res) {
  fileServer.serve(req, res);
}).listen(8080);

var io = socketIO.listen(app);