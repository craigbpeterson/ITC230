'use strict'
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
  let playerList = [];
  switch(path) {
    case '/':
      serveStaticFile(res, '/public/home.html', 'text/html');
      break;
    case '/about':
      serveStaticFile(res, '/public/about.html', 'text/html');
      break;
    case '/getall':
      playerList = players.getAll(); //get array of all players
      let getAllMessage = (playerList.length !== 0) ? 'Total Players: ' + playerList.length + '\n\nEntire Player List: \n' + JSON.stringify(playerList) : 'List is empty.';
      res.writeHead(200, { 'Content-Type': 'text/plain' } );
      res.end(getAllMessage);
      break;
    case '/get':
      let found = players.get(params.number); //get player object
      let getMessage = (found) ? JSON.stringify(found) : "Not found";
      res.writeHead(200, { 'Content-Type': 'text/plain' } );
      res.end('Results for Jersey Number ' + params.number + ":\n\n" + getMessage);
      break;
    case '/delete':
      let deletedPlayer = players.get(params.number); //get player object to be deleted
      players.delete(params.number); //delete the player
      playerList = players.getAll(); //get new array of all players
      let deleteMessage = (deletedPlayer) ? 'Player Deleted: ' + JSON.stringify(deletedPlayer) + '\n\nTotal Players Remaining: ' + playerList.length : 'Player not found. No players deleted. Total Players: ' + playerList.length;
      res.writeHead(200, { 'Content-Type': 'text/plain' } );
      res.end(deleteMessage);
      break;
    case '/add':
      let playerDetails = params; //get player details to be added
      if (playerDetails.number) { players.add(playerDetails); } //add the player if details were entered into the query string
      playerList = players.getAll(); //get new array of all players
      let addMessage = (playerDetails.number) ? 'Player Added: ' + JSON.stringify(playerDetails) + '\n\nNew Total Players: ' + playerList.length : 'No player number entered. No player added. Total Players Remains: ' + playerList.length;
      res.writeHead(200, { 'Content-Type': 'text/plain' } );
      res.end(addMessage);
      break;
    default:
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');
      break;
  }
}).listen(process.env.PORT || 3000);