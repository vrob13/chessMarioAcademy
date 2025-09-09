// needed imports
const express = require('express');
const path = require('path');
const { Socket } = require('socket.io');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
require('dotenv').config();

// Middleware

app.use(express.json());
app.use(express.static(path.join(__dirname, '../front')));

// Routes for views
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../front/views/index.html'));
});
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../front/views/login.html'));
});
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '..//front/views/register.html'));
});

// basic Socket.io settings
io.on('connection', (Socket) => {
    console.log('a user connected');
    Socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

//  Port Settings and server start
const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

