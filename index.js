'use strict';
const express = require('express'); //load the express module
const app = express(); //start the express module

let players = require('./lib/players.js'); //load my players.js module (array of Sounders players)

app.set('port', process.env.PORT || 3000); //set the port for the server
app.use(express.static(__dirname + '/public')); //set location for static files

//load body-parser module and parse form submissions
app.use(require('body-parser').urlencoded({extended: true}));

//load express-handlebars view engine
let handlebars =  require('express-handlebars'); 
app.engine('.html', handlebars({extname: '.html'}));
app.set('view engine', '.html');


/* ============ */
/* start routes */
/* ============ */

//home page
app.get('/', function(req,res){
    let allPlayers = players.getAll(); //get entire array of Sounders players
    res.render('home', {allPlayers});
});

//about page
app.get('/about', function(req,res) {
    res.type('text/html');
    res.sendFile(__dirname + '/public/about.html'); 
});

//details page - for search results
app.post('/details', function(req,res) {
    let playerNumber = req.body.number; //get number that was searched
    let searchResult = players.get(playerNumber); //get player object
    res.render('details', {searchResult, playerNumber});
});

//details page - for clickable list items
app.get('/details', function(req,res) {
    let playerNumber = req.query.number; //get number that was searched
    let searchResult = players.get(playerNumber); //get player object
    res.render('details', {searchResult, playerNumber});
});

//delete page
app.get('/delete', function(req,res) {
    let numberToDelete = req.query.number;
    let playerDeleted = players.get(numberToDelete);
    players.delete(numberToDelete); //delete player object
    let totalPlayers = players.getAll().length; //get new total number of players
    res.render('delete', {playerDeleted, totalPlayers, numberToDelete});
});

//add page
app.get('/add', function(req,res) {
    let newPlayerDetails = req.query; //get new player details from user-entered query string
    let result = players.add(newPlayerDetails); //attempt to add player
    res.render('add', {newPlayerDetails, added: result.added, newTotalPlayers: result.totalPlayers, playerExists: result.playerExists});
});

// define 404 handler
app.use(function(req,res) {
    res.type('text/plain'); 
    res.status(404);
    res.send('404 - Not found');
});

/* ========== */
/* end routes */
/* ========== */


//start the server
app.listen(app.get('port'), function() {
    console.log('Express started successfully! Wahoo!');
});