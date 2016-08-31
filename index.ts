import * as express from 'express';
import * as bodyParser from 'body-parser';
import config from './config';
import http = require('http');
import socketio = require('socket.io');
import apiRouter from './routes/api-router';
import session from './session';

var port = process.env.port || config.devPort;
let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', express.static(__dirname + '/public'));
app.use('/api', apiRouter);

//setup socket.io
let server = http.Server(app);
var io = socketio.listen(server);

io.on("connection", function (socket) {
    console.log(`connection establish (${socket.conn.id})`);
    socket.on("message", d => {
        if (d.message == 'strokedata') {
            //handle strokedata messages right here

            //add rower if they don't aready exist
            if (!session.rowers.some(r => r.name == d.name)) {
                console.log(`adding ${d.name}`);
                session.addRower({
                    name: d.name
                });
            }

            //if the session is active, record the rowers new distance
            if (session.status == 'active') {
                let r = session.rowers.filter(r => r.name == d.name)[0];
                r.distance = Math.min(session.distance, d.distance);
                if (r.distance >= session.distance) {
                    //TODO:declare winner
                    session.end();
                }
            }


        }
        else {
            //pass other messages on to all connected socket clients
            io.send(d);
        }
    });
});

server.listen(port, function () {
    console.log("Listening on port %s...", server.address().port);
});