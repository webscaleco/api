import * as express from 'express';
import * as bodyParser from 'body-parser';
import config from './config';
import sessionRouter from './session-router';
import { io, server } from './socket';

var port = process.env.port || config.devPort;
export let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', sessionRouter);

io.on("connection", function (socket) {
    console.log(`connection establish (${socket.conn.id})`);
    socket.on("message", data => {
        io.send(data);
    });
});

server.listen(port, function () {
    console.log("Listening on port %s...", server.address().port);
});
