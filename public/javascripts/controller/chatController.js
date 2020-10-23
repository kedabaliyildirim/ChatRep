app.controller('chatController', ('$scope', 'chatFactory','userFactory', ($scope, chatFactory, userFactory) => {
    //initialization
    function init(){
        userFactory.getUser().then(user => {
        $scope.user = user;
        })

    }
    
    init();
    
    
    $scope.activeTab        = 1;
    $scope.chatClicked      = false;
    $scope.loadingMessages  = false;
    $scope.chatName         = "";
    $scope.roomId           = "";
    $scope.message          = "";
    $scope.messages         = [];
    $scope.user             = {};

    const socket = io.connect('http://localhost:3000')
    
    
    socket.on('onlineUser', (users) => {
        $scope.onlineList = users;
        $scope.$apply();
    })
    socket.on('roomList', (rooms) => {
        $scope.roomList = rooms;
        $scope.$apply();
    })
    $scope.newMessage = () => {
        socket.emit('newMessage', {
            message: $scope.message,
            roomId:  $scope.roomId
        } )
        $scope.message= '';
        console.log($scope.user);
    }
    $scope.switchRoom= room =>{
        $scope.chatClicked = true;
        $scope.roomId      = room.id;
        $scope.chatName    = room.Name;
        $scope.loadingMessages  = true;
        chatFactory.getMessages(room.id).then(data => {
            console.log(data);
            $scope.messages[room.id] = data;
            console.log($scope.messages);
            $scope.loadingMessages  = false;
        })
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