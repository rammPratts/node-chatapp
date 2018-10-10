var socket = io();

function scrollToBottom(){
    //Selectors
    var messages = jQuery("#messages");
    var newMessage = messages.children("li:last-child");
    //Heights
    var clientHeight = messages.prop("clientHeight");
    var scrollTop = messages.prop("scrollTop");
    var scrollHeight = messages.prop("scrollHeight");
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
        messages.scrollTop(scrollHeight);
    }
}

function checkIfPrivate(text){
    textArray = text.split("");

    if(text.array[0] === "@"){
        return true;
    }else{
        return false;
    }
}

function splitPrivateMessage(text){
     var textArray = text.split(" ");
     var user = textArray[0].split("");
     user.shift();
     user = user.join("");
     textArray.shift();
     var message = textArray.join(" ");
    return [user, message]
}

socket.on("connect", function() {
    var params = jQuery.deparam(window.location.search);

    socket.emit("join", params, function(err){
        if(err){
            alert(err);
            window.location.href = "/";
        }else{
            console.log("No error");
        }
    });
});

socket.on("newMessage", function(message){
    var formattedTime = moment(message.cratedAt).format("HH:mm");
    var template = jQuery("#message-template").html();
    var html = Mustache.render(template,{
        text: message.text,
        from: message.from,
        time: formattedTime
    });
    jQuery("#messages").append(html);
    scrollToBottom();
});

socket.on("newLocationMessage", function(message){
    var formattedTime = moment(message.cratedAt).format("HH:mm");
    var template = jQuery("#location-message-template").html();
    var html = Mustache.render(template,{
        url: message.url,
        from: message.from,
        time: formattedTime
    });

    jQuery("#messages").append(html);  
    scrollToBottom();
});

socket.on("newPrivateMessage", function(message){
    var formattedTime = moment(message.cratedAt).format("HH:mm");
    var template = jQuery("#private-message-template").html();
    var html = Mustache.render(template,{
        from: message.from,
        to: message.to,
        text: message.text,
        time: formattedTime
    });
    if(socket.id === message.senderID || socket.id === message.destinyID){    
        jQuery("#messages").append(html);  
        scrollToBottom();
    }
});

socket.on("disconnect", function() {
    console.log("Disconnected from server");
});

socket.on("updateUserList", function(users){
    console.log(users);
    var ol = jQuery("<ol></ol>");

    users.forEach(function (user){
        ol.append(jQuery("<li></li>").attr("id","user").text(user));
    });

    jQuery("#users").html(ol);
});

jQuery("#message-form").on("submit", function(e){
    e.preventDefault();

    var messageTextBox = jQuery("[name=message]");
    if(checkIfPrivate){
       var message = splitPrivateMessage(messageTextBox.val());
       socket.emit("createPrivateMessage",{
           to: message[0],
           text: message[1]
       }, function(){
           messageTextBox.val("");
       })
    }else{
        socket.emit("createMessage", {
            text: messageTextBox.val()
        }, function(){
            messageTextBox.val("");
        })
    }
});

var locationButton = jQuery("#send-location");

locationButton.on("click", function() {
    if(!navigator.geolocation){
        return alert("Geolocation not available");
    }

    locationButton.attr("disabled", "disabled").text("Sending location...");

    navigator.geolocation.getCurrentPosition(function(position){
        locationButton.removeAttr("disabled").text("Send location");
        socket.emit("createLocationMessage", {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function(){
        alert("Unable to fetch location");
        locationButton.removeAttr("disabled").text("Send location");
    });
});

jQuery("#users").on("click","li#user", function(){
    var user = jQuery(this).text();
    jQuery("[name=message]").val(`@${user} `);
});

