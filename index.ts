import * as express from 'express';
import socketio = require('socket.io');
import * as bodyParser from 'body-parser';
import * as config from 'config';
import http = require('http');
import * as _ from 'lodash';
import session from './session';

//config
var port = process.env.port || (config.has('port') ? config.get('port') : 8080);

let app = express();

//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//setup socket.io
let server = http.Server(app);
let socketServer = socketio.listen(server);

socketServer.on("connection", function (socket) {
    console.log(`connection establish (${socket.conn.id})`);
    socket.on("message", d => {
        if (d.message == 'rower-checkin') {
            //add rower if they don't aready exist
            if (!session.rowers.some(r => r.name == d.name)) {
                session.addRower({ name: d.name });
                socketServer.send({ message: 'session-change', session: session });
            }
        }
        if (d.message == 'strokedata') {
            //if the session is active, record the rowers new properties
            if (session.status == 'active') {
                let r = session.rowers.find(r => r.name == d.name);
                r.distance = d.ms_distance;
                r.speed = d.m_s_total;
                r.averageSpeed = d.m_s_average;
                r.power = Math.round(d.total_kcal);

                this.send({ message: 'rower-change', rower: r });
            }
        }
        else {
            //pass other messages on to all connected socket clients
            socketServer.send(d);
        }
    });
});

//configure routes
//when state changes, we'll send a socket message so the UI can be update
//when rowers are added or deleted we'll send a session-change socket message
app.use('/', express.static(__dirname + '/public'));

app.get('/api/session', (req, res) => {
    res.json(session);
});

app.post('/api/session/start', (req, res) => {
    session.start();
    socketServer.send({ message: 'session-change', session: session });
    socketServer.send({ message: 'sessionstart' });
    res.json(session);
});

app.post('/api/session/end', (req, res) => {
    session.end();
    socketServer.send({ message: 'session-change', session: session });
    socketServer.send({ message: 'sessionend' });
    res.json(session);
});

app.get('/api/session/rowers', (req, res) => {
    res.json(session.rowers);
})

app.get('/api/session/rower/:name', (req, res) => {
    res.json(_.find(session.rowers, { name: req.params.name }));
})

app.post('/api/session/rower/:name', (req, res) => {
    let r = { name: req.params.name };
    session.addRower(r);
    socketServer.send({ message: 'session-change', session: session });
    res.json(r);
})

app.delete('/api/session/rower/:name', (req, res) => {
    _.remove(session.rowers, { name: req.params.name });
    socketServer.send({ message: 'session-change', session: session });
    res.status(200).end();
})


//start the web server
server.listen(port, function () {
    console.log("Listening on port %s...", server.address().port);
});