const socket = io();

const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (input.value) {
        socket.emit('chat message', input.value);
        input.value = '';
    }
});

// Ontvang de chatgeschiedenis en voeg deze toe aan de lijst
socket.on('chat history', function(history) {
    history.forEach((msg) => {
        const item = document.createElement('li');
        item.textContent = msg;
        messages.appendChild(item);
    });
    messages.scrollTop = messages.scrollHeight;
});

socket.on('chat message', function(msg) {
    const item = document.createElement('li');
    item.textContent = msg;
    messages.appendChild(item);
    messages.scrollTop = messages.scrollHeight;
});
