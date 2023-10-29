const express = require('express');
const { createServer } = require('node:http');
const PORT = 8000;
const { Server } = require('socket.io');


const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(express.urlencoded());

app.use(express.static('./assets'));


// view engine
app.set('view engine', 'ejs');
app.set('views','./views');

// Setting up routs
app.use('/',require('./routs'));


const users = {};
// setting up socket 
io.on('connection', async(socket) => {
    console.log(`A user connected`);
    socket.on('new-user-joined' , (name) => {
        console.log(`new user joined`, name);
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    })

    // 
    socket.on('disconnect', () => {
        console.log(`User disconnected`);
    })

    //
    
    // dfvzv
    
    
    socket.onAny((eventName,msg) => {
        socket.broadcast.emit('receive' , msg)
    }) 
})


server.listen(PORT, (error) => {
    if(error){console.log(`Error in starting server ${error}`)}

    console.log(`Server is up and running on port : ${PORT}`);
})
