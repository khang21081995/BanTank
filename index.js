var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
app.use(express.static(__dirname));


app.get('/', function(req, res){
  res.sendFile(__dirname + 'index.html');
});

var players = [];
var getPlayerById = function(id,killKo){
  for(var i=0;i<players.length;i++){
    if(players[i].id == id){
      return killKo?players.splice(i,1)[0] :players[i];// splicce dung de xoa phan tu thu i trong mang
    }
  }
}

io.on('connection', function(socket){
  console.log('New User Connected');

  // Send all players' data to the new player
  socket.emit('other_players', players);

  var newPlayerInfo = {
    id  : socket.id,
    x   : Math.random()*3200,
    y   : Math.random()*800
  }
  // Tell the new player where to initiate his tank
  socket.emit('connected', newPlayerInfo);
  // Tell all other players where to initiate new player's tank
  socket.broadcast.emit('new_player_connected', newPlayerInfo);
  // Add new player's info to the array of all players
  players.push(newPlayerInfo);

  socket.on('tank_moved', function(data){
    var playerInfo = getPlayerById(data.id,false);
    playerInfo.x = data.position.x;
    playerInfo.y = data.position.y;
    socket.broadcast.emit('player_moved', data);
  });

  socket.on('tank_fired', function(data){
    var playerInfo = getPlayerById(data.id,false);
    playerInfo.x = data.position.x;
    playerInfo.y = data.position.y;
    socket.broadcast.emit('player_fired', data);
  });

  socket.on('tank_died', function(data){
    var playerInfo = getPlayerById(data.id,true);
    socket.broadcast.emit('player_died', playerInfo);
  });
});

http.listen(6969, function(){
  console.log('Server started. Listening on *:6969');
});
