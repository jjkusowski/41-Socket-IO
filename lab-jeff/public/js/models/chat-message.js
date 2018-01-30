'use strict';

class ChatMessage {
  constructor(message) {
    this.username = message.username;
    this.timestamp = message.timestamp;
    this.message = message.message;
    this.avatar = message.avatar;
  }

  render(parentElement) {
    let container = document.createElement('div');
    let timestamp = document.createElement('span');
    let username = document.createElement('span');
    let message = document.createElement('span');
    let avatar = document.createElement('img');

    container.classList.add('message');
    timestamp.classList.add('timestamp');
    username.classList.add('username');
    avatar.classList.add('avatar');

    timestamp.textContent = this.timestamp;
    avatar.src = this.avatar;
    username.textContent = this.username + ':';
    message.textContent = this.message;

    container.appendChild(timestamp);
    container.appendChild(avatar);
    container.appendChild(username);
    container.appendChild(message);

    parentElement.appendChild(container);
  }
}
