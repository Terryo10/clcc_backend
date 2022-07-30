const verify = require('../../middleware/auth');
const messageExpirationTimeMS = 5 * 60 * 1000;
const User = require("../../models/user");

class Connection {
    constructor(io, socket) {
        this.socket = socket;
        this.io = io;
        onlineusers = [];
        socket.on('getMessages', () => this.getMessages());
        socket.on('room', (data) => this.joinRoom(data))
        socket.on('message', (value) => this.handleMessage(value));
        socket.on('disconnect', () => this.disconnect());
        socket.on('connect_error', (err) => {
            console.log(`connect_error due to ${err.message}`);
        });
    }


    joinRoom = (data)  =>{
      var user  = User.findOne({id: data.id});
      var meeting = data.meeting;

    }

    sendMessage(message) {
        this.io.sockets.emit('message', message);
    }

    getMessages() {
        messages.forEach((message) => this.sendMessage(message));
    }

    handleMessage(value) {
        console.log(`kkkkk ${value.name}`);
    }

    disconnect() {

    }
}

function chat(io,) {
    io.use(verify);
    io.on('connection', (socket) => {
        new Connection(io, socket);
    });
}

module.exports = chat;