var socket = io();

socket.on("connect", function() {
    console.log("Connected to the server")

    socket.on("newMessage", function(message){
        console.log("New message received! ", message);
    });
});


socket.on("disconnect", function() {

});