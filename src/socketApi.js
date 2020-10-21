const socketio = require('socket.io');

const io = socketio();

const socketApi = {
    io : io
};
io.on('connection', socket => {
    console.log("AFPLEA{K{PEGKAGPKAPFL{PKEV{KEPFLEAPD{LF{PALEF{PL");
})
module.exports = socketApi;