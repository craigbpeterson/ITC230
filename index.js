var http = require('http');
var fs = require('fs');
var qs = require('querystring');
var players = require('./lib/players.js');

function serveStaticFile(res, path, contentType, responseCode) {
  if(!responseCode) {
    responseCode = 200;
  }
  fs.readFile(__dirname + path, function(err,data) {
    if(err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
    } else {
      res.writeHead(responseCode,
        { 'Content-Type': contentType });
      res.end(data);
    }
  });
}

http.createServer(function(req,res) {
  let url = req.url.split('?'); //separate route from query string
  let params = qs.parse(url[1]); //convert query string to object
  let path = url[0].toLowerCase();
  switch(path) {
    case '/':
      serveStaticFile(res, '/public/home.html', 'text/html');
      break;
    case '/about':
      serveStaticFile(res, '/public/about.html', 'text/html');
      break;
    case '/getall':
      let playerList = players.getAll(); //get array of all players
      let getAllMessage = (playerList.length !== 0) ? 'Entire Player List: \n' + JSON.stringify(playerList) : 'List is empty.';
      res.writeHead(200, { 'Content-Type': 'text/plain' } );
      res.end(getAllMessage);
      break;
    case '/get':
      let found = players.get(params.number); //get player object
      let getMessage = (found) ? JSON.stringify(found) : "Not found";
      res.writeHead(200, { 'Content-Type': 'text/plain' } );
      res.end('Results for ' + params.number + "\n" + getMessage);
      break;
    case '/delete':
      let deletedPlayer = players.get(params.number); //get player object to be deleted
      players.delete(params.number); //delete the player
      let deletedPlayersList = players.getAll();
      let deleteMessage = (deletedPlayer) ? 'Player Deleted: ' + JSON.stringify(deletedPlayer) + '\nTotal Players: ' + deletedPlayersList.length : 'Player not found. No players deleted. Total Players: ' + deletedPlayersList.length;
      res.writeHead(200, { 'Content-Type': 'text/plain' } );
      res.end(deleteMessage);
      break;
    case '/add':
      let playerDetails = params; //get player details to be added
      players.add(playerDetails); //add the player
      let addedPlayersList = players.getAll();
      let addMessage = (playerDetails) ? 'Player Added: ' + JSON.stringify(playerDetails) + '\nTotal Players: ' + addedPlayersList.length : 'No player data entered. No player added. Total Players: ' + addedPlayersList.length;
      res.writeHead(200, { 'Content-Type': 'text/plain' } );
      res.end(addMessage);
      break;
    default:
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');
      break;
  }
}).listen(process.env.PORT || 3000);