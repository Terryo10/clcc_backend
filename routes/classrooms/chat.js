const verify = require('../../middleware/auth');
const messageExpirationTimeMS = 5 * 60 * 1000;
const User = require("../../models/user");
const meetingSchema = require("../../models/meetings");

class Connection {
    constructor(io, socket) {
        this.socket = socket;
        this.io = io;
        this.onlineUsers =  [];
        socket.on('getMessages', () => this.getMessages());
        socket.on('room', (data) => this.joinRoom(data))
        socket.on('message', (value) => this.joinRoom(value ));
        socket.on('disconnect', () => this.disconnect());
        socket.on('connect_error', (err) => {
            console.log(`connect_error due to ${err.message}`);
        });
    }


    joinRoom = async (data )  =>  {
      const user  = await User.findById(data.student_id);
      const meeting = await meetingSchema.findById(data.meeting_id);

      if(meeting && user){
          if(meeting.permitted_users.includes(user.id)){
              this.onlineUsers.forEach(element =>{
                  if(element.id === user.id){
                      // do nothing
                  }
              });
              this.onlineUsers.push({
                  'id':user.id, 'socket_id': this.socket.id
              });
              console.log(this.onlineUsers);
          }else{
              console.log('haubvumidzwe kupinda');
          }

      }else{
          console.log('hakuna munhu');
      }
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
    // io.use(verify);
    io.on('connection', (socket) => {
        new Connection(io, socket);
    });
}

module.exports = chat;