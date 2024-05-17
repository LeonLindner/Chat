const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const messages = []; // Array om berichten op te slaan

app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('A user connected');

    // Stuur de laatste 20 berichten naar de nieuwe gebruiker
    socket.emit('chat history', messages.slice(-20));

    socket.on('chat message', (msg) => {
        // Voeg het nieuwe bericht toe aan de array
        messages.push(msg);

        // Stuur het nieuwe bericht naar alle clients
        io.emit('chat message', msg);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
