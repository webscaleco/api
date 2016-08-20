import http = require('http');
import socketio = require('socket.io');
import { app } from './index';

export let server = http.Server(app);
export let io = socketio.listen(server);