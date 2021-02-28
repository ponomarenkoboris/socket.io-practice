const express = require('express');
const socket = require('socket.io');
const app = express();

const PORT = 4000;
const server = app.listen(PORT, () => {
    console.log(`Listening request from port ${PORT}`);
});

// Static files
app.use(express.static('client'));


//Socket setup
const io = socket(server);
io.on('connection', socket => {
    console.log('Socket connected', socket.id);
    socket.join('testSocket'); // name of socket
    // Listen event from client side
    socket.on('input:client', data => { // data is the data, that I send from client
        // sending message to all client, that connected to the socket
        io.sockets.emit('output:server', data)
    });

    // Send message to socket with name 'testSocket';
    socket.to('testSocket').emit("user:connect", { handle: 'Jphn', message: 'in the room' });

    // Broadcast send message to all sockets acsept current socket
    socket.on('broad:input', data => {
        console.log('data: ', data);
        socket.broadcast.emit('broad:output', data)
    })
});