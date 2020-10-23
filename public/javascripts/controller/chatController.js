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
    socket.on('realTimeMessage', (realTM) => {
        $scope.messages[realTM.roomId].push({
            userId  :  realTM.userId,
            name    :  realTM.name,
            surname :  realTM.surname,
            message :  realTM.message
        });
        $scope.$apply();
    })
    $scope.newMessage = () => {
        if($scope.message.trim() !== '') {
            socket.emit('newMessage', {
                message: $scope.message,
                roomId:  $scope.roomId
            });
            $scope.messages[$scope.roomId].push({
                userId:  $scope.user._id,
                name:  $scope.user.name,
                surname:  $scope.user.surname,
                message: $scope.message
            })
            $scope.message= '';    
        }
    };
    $scope.switchRoom= room =>{
        $scope.chatClicked = true;
        $scope.roomId      = room.id;
        $scope.chatName    = room.Name;

        if (!$scope.messages.hasOwnProperty(room.id)){
            $scope.loadingMessages  = true;
        }

        chatFactory.getMessages(room.id).then(data => {
            
            $scope.messages[room.id] = data;
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