
var socket = io();
$(function () {
  $('#chatRoom').submit(function(event){
    event.preventDefault()
    socket.emit('chat message', $('#messageInput').val());
    $('#messageInput').val('');
  });
  socket.on('chat message', function(msg){
    $('#messages').append($('<li>').text(msg));
    window.scrollTo(0, document.body.scrollHeight);
  });
});
