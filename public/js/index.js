var socket = io();

socket.on("connect", function() {
    socket.on("newMessage", function(message){
        console.log("New message received! ", message);
    });
});

socket.emit("createMessage", {
    from: "notQueso",
    text: "ola yo no soy queso xd"
});

socket.on("disconnect", function() {

});