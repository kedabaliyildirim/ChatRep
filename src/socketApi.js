const socketio = require('socket.io');
const socketAuthorization = require('../middleware/socketAuthorization');
const io = socketio();
const socketApi = {
	io
};
io.use(socketAuthorization);
//libs
const Users =require('./lib/Users');
const Rooms =require('./lib/Rooms');
const Messages =require('./lib/Messages');

// REDIS ADAPTER
const redisAdapter = require('socket.io-redis');
const rooms = require('./lib/Rooms');
io.adapter(redisAdapter({
    host:process.env.REDIS_URI,
    port:process.env.REDIS_PORT
}))

io.on('connection', socket => {
    Rooms.list(rooms => {
        io.emit('roomList', rooms)

    })

    Users.upsert(socket.id, socket.request.user);
    
    Users.list(users => {
        io.emit('onlineUser', users)

    })
    socket.on('newRoom', roomName =>{
        Rooms.upsert(roomName); 
        Rooms.list(rooms => {

            io.emit('roomList', rooms)
    
        })
    })
    socket.on('newMessage', message =>{
        const messageData = {
            ...message,
            userId  : socket.request.user._id,
            name    : socket.request.user.name,
            surname : socket.request.user.surname
        };
        Messages.upsert(messageData);
        socket.broadcast.emit('realTimeMessage', (messageData))
    })
    socket.on('disconnect', () => {
        Users.remove(socket.request.user._id);
        Users.list(users => {
            io.emit('onlineUser', users)
        })
    })

})
module.exports = socketApi;