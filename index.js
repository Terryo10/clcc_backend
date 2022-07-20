const express = require('express');
const app = express();
const port = 3000;
const auth = require('./routes/auth/auth');
const classroom = require('./routes/classrooms/classroom');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv')
let mongoose = require('mongoose');
const bodyParser = require(  'body-parser');
const server = require('http').Server(app)
const io = require('socket.io')(server);
dotenv.config();

let mongoDB = process.env.DB_CONN;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
  console.log('connected')
});
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(helmet());
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('combined'));

app.use('/api/auth/', auth);
app.use('/room/', classroom );
app.get('/', (req, res) => {
  res.send('CLCC API :)')
});


io.on('connection', socket => {
  socket.on('join-room', (roomId, userId) => {
    socket.join(roomId)
    socket.to(roomId).broadcast.emit('user-connected', userId)


    socket.on('disconnect', () => {
      socket.to(roomId).broadcast.emit('user-disconnected', userId)
    })
  })
});

server.listen(port)