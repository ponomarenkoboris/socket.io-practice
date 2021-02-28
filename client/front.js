const input = document.querySelector('#inputField');
const output = document.querySelector('#outputField');
const sendBtn = document.querySelector('#sendEmit');
const broadcastInput = document.querySelector('#broadcastInput');
const broadcastOutput = document.querySelector('#broadcastOutput');
const roompeople = document.querySelector('#roompeople');

// Make connection 
const socket = io();

// Emit evevnt
sendBtn.addEventListener('click', () => {
    if (!input.value.trim()) return console.error('Input is empty');
    // emit message to the server
    socket.emit('input:client', { message: input.value, handle: 'joi' });
    output.value = ''
});

broadcastInput.addEventListener('keypress', () => {
    socket.emit('broad:input', { message: broadcastInput.value, handle: 'Broad' });
});

// Listen for socket event
socket.on('output:server', data => {
    output.value = data.handle + ': ' + data.message;
});

socket.on('broad:output', data => {
    broadcastOutput.value = data.handle + ': ' + data.message;
});

socket.on('user:connect', data => {
    roompeople.value = data.handle + ': ' + data.message;
});