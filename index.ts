import * as express from 'express';
import * as bodyParser from 'body-parser';
import config from './config';
import http = require('http');
import socketio = require('socket.io');
import sessionRouter from './session-router';

var port = process.env.port || config.devPort;
let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', sessionRouter);

//setup socket.io
let server = http.Server(app);
var io = socketio.listen(server);

io.on("connection", function (socket) {
    console.log(`connection establish (${socket.conn.id})`);
    socket.on("message", data => {
        io.send(data);
    });
});

server.listen(port, function () {
    console.log("Listening on port %s...", server.address().port);
});