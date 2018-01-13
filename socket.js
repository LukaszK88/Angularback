var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Redis = require('ioredis');


var redis = new Redis();

redis.on('error', function (error) {
  console.log('@@@@@@@@@@')
  console.dir(error)
})

redis.subscribe('chatroom');

redis.on('message', function(channel, message) {
  message = JSON.parse(message);
  io.emit(channel,message);
});

http.listen(3000, function(){
  console.log('Listening on Port 3000');
});

