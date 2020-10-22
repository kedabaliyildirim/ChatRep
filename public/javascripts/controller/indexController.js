app.controller('indexController', ('$scope', ($scope) => {
    const socket = io.connect("http://localhost:3000");
    console.log('hey');
    socket.on('hello', () => {
        console.log("Hello");
    })
}))