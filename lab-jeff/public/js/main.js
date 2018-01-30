'use strict';

const socket = io();
console.log('ID: ', socket.id);

let sendMessageForm = document.getElementById('send-message-form');
let messageInput = document.getElementById('message-input');
let messagesContainer = document.getElementById('messages');

sendMessageForm.addEventListener('submit', event => {
  event.preventDefault();
  let message = messageInput.value;
  messageInput.value = null;
  socket.emit('send-message', { message: message });
});

socket.on('receive-message', data => {
  let message = new ChatMessage(data);
  message.render(messagesContainer);
});

let setUsernameForm = document.getElementById('set-username-form');
let usernameInput = document.getElementById('username-input');
setUsernameForm.addEventListener('submit', event => {
  event.preventDefault();
  let username = usernameInput.value;
  socket.emit('set-username', { username: username });
});

let setAvatarForm = document.getElementById('set-avatar-form');
let avatarInput = document.getElementById('avatar-input');
setAvatarForm.addEventListener('submit', event => {
  event.preventDefault();
  let avatar = avatarInput.value;
  socket.emit('set-avatar', { avatar: avatar });
});
