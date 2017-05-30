
var socket = io();
$(function () {
  $('form').submit(function(){
    socket.emit('chat message', $('#messageInput').val());
    $('#messageInput').val('');
    return false;
  });
  socket.on('chat message', function(msg){
    $('#messages').append($('<li>').text(msg));
    window.scrollTo(0, document.body.scrollHeight);
  });
});
