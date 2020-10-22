app.controller('chatController', ('$scope', ($scope) => {
    $scope.activeTab   = 1;
    $scope.chatClicked = false;
    $scope.chatName    = ""
    const socket = io.connect('http://localhost:3000')
    
    
    socket.on('onlineUser', (users) => {
        $scope.onlineList = users;
        $scope.$apply();
    })
    socket.on('roomList', (rooms) => {
        $scope.roomList = rooms;
        $scope.$apply();
    })

    $scope.switchRoom= room =>{
        $scope.chatClicked = true;
        $scope.chatName    = room.roomName;
    }
    
    $scope.onlineList
    $scope.newRoom = () =>{
        //let randomName = Math.random().toString(36).substring(7)
        let roomName = window.prompt('Enter Room Name Please...')
        if(roomName !== '' && roomName !== null) {
            socket.emit('newRoom', roomName);
        }
        
    }
    $scope.changeTab = tab =>{
        $scope.activeTab= tab;
    }
    
}))