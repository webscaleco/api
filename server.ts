// Import dependencies
var express = require("express");
var app = express();
var server = require("http").Server(app);
var io = require("socket.io").listen(server);
import config from './config';

var port = process.env.port || config.devPort;
 
io.on("connection", function (socket) {
    socket.on("message", data => {
        io.send(data);
    });
});
 
 server.listen(port, function () {
     console.log("Listening on port %s...", server.address().port);
 });
  