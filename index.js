const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors');
const path = require('path');

const { addUser, removeUser, getUser, getUsersInRoom} = require('./users.js');

const PORT = process.env.PORT || 5000;
const router = require('./router');

const app = express();
app.use(express.static(path.resolve(__dirname, "./build")));
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '/build', 'index.html'));
  });
const server = http.createServer(app);

corsOptions={
    cors: true,
    origins:["*"]
}
const io = socketio(server, corsOptions);

app.use(cors());


// New connection
io.on('connection', (socket) => {
    console.log('Connected');

    // When user joins room
    socket.on('join', ({name}, callback) => {
        const {error, user} = addUser({ id: socket.id, name});
        
        if(error) return callback(error);

        socket.emit('message', { user:'adminJoin', text: `${name} has joined!` });
        socket.broadcast.emit('message', {user:'adminJoin', text: `${name} has joined!` });
        // socket.join(user.room);


        // Canvas data points emission
        socket.on('canvas-move-backend', (x, y) =>{
            socket.broadcast.emit('canvas-move-frontend', x, y);
        });

        socket.on('canvas-draw-backend', (x, y) =>{
            socket.broadcast.emit('canvas-draw-frontend', x, y);
        });

        // Canvas colour emission

        socket.on('canvas-colour-backend', colour => {
            socket.broadcast.emit('canvas-colour-frontend', colour);
        });

        // Canvas clear emission

        socket.on('canvas-clear-backend', clearCanvas => {
            socket.broadcast.emit('canvas-clear-frontend', clearCanvas);
        });

        //Person drawing on canvas emission

        socket.on('user-drawing-backend', name => {
            io.emit('user-drawing-frontend', name);
        });

        socket.on('canvasOccupied-backend', status => {
            socket.broadcast.emit('canvasOccupied-frontend', status);
        })

        
        const tempUsers = getUsersInRoom();
        io.emit('usersList', {tempUsers: tempUsers} );

        callback(); 
    });

    socket.on('sendMessage', (message, callback)=>{
    
        const user = getUser(socket.id); 

        io.emit('message', { user: user.name, text:message }); 

        callback();

    });

    socket.on('scale', (scale) => {
        const user = getUser(socket.id);
        io.emit('scale-backend', scale);
    });

    socket.on('disconnect', () => {
        const user = removeUser(socket.id);
    
        if(user) {
            io.emit('message', { user: 'adminLeft', text: `${user.name} has left.` });
            const tempUsers = getUsersInRoom(user.room);
            io.emit('usersList', {tempUsers: tempUsers} );
            console.log("Disconnected");
        }
      });
    
});



app.use(router);
server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));