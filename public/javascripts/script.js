
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
    localStorage.id = (document.cookie.split('=')[2])
  });
});

$( ".chatRoomCardObject" ).on( "click", function(event) {
  $(this).attr("data-id")
  console.log("please work please=============",localStorage.id)


});
