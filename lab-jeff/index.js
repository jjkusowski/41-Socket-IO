'use strict';

const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const PORT = 3000;
app.use(express.static('./public'));

const USERS = {};

io.on('connection', socket => {
  USERS[socket.id] = {};
  USERS[socket.id].username = 'anonymous';
  USERS[socket.id].avatar = 'http://ksassets.timeincuk.net/wp/uploads/sites/55/2017/03/twitteregg.jpg';

  socket.on('disconnect', () => {
    console.log('LEFT', socket.id);
  });

  socket.on('send-message', data => {
    data.username = USERS[socket.id].username;
    data.avatar = USERS[socket.id].avatar;
    data.timestamp = new Date().toLocaleTimeString();
    console.log('MESSAGE: ', data.message);
    io.emit('receive-message', data);
  });

  socket.on('set-username', data => {
    USERS[socket.id].username = data.username;
  });

  socket.on('set-avatar', data => {
    USERS[socket.id].avatar = data.avatar;
  });
});

http.listen(PORT, () => {
  console.log('http://localhost:' + PORT);
});
