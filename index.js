'use strict';

const express = require('express'); //load the express module
const app = express(); //start the express module
let Player = require('./models/player'); //load the mongoDB model

//configure Express app
app.set('port', process.env.PORT || 3000); //set the port for the server
app.use(express.static(__dirname + '/public')); //set location for static files
app.use(require('body-parser').urlencoded({extended: true})); //load body-parser module and parse form submissions
app.use((err, req, res, next) => {
    console.log(err);
});

//load express-handlebars view engine
let handlebars = require('express-handlebars');
app.engine('.html', handlebars({extname: '.html'}));
app.set('view engine', '.html');


/* ============ */
/* start routes */
/* ============ */

//home page
app.get('/', function(req, res, next) {
    //get entire array of Sounders players
    Player.find( function(err, allPlayers) {
        if (err) return next(err);
        res.render('home', {allPlayers}); //send allPlayers array to home.html view
    });
});

//about page
app.get('/about', function(req, res) {
    res.type('text/html');
    res.sendFile(__dirname + '/public/about.html'); 
});

//details page - for search results
app.post('/details', function(req, res, next) {
    let playerNumber = req.body.number; //get number that was searched
    
    //get player record from MongoDB
    Player.findOne({number:playerNumber}, function(err, player) {
       if (err) return next(err);
       res.render('details', {player, playerNumber}); //send player results to details.html view
    });
});

//details page - for clickable list items
app.get('/details', function(req, res, next) {
    let playerNumber = req.query.number; //get number from link query string
    
    //get player record from MongoDB
    Player.findOne({number:playerNumber}, function(err, player) {
       if (err) return next(err);
       res.render('details', {player, playerNumber}); //send player results to details.html view
    });
});

//delete page
app.get('/delete', function(req, res, next) {
    let numberToDelete = req.query.number;
    
    //delete player record from MongoDB
    Player.findOneAndRemove({number:numberToDelete}, function(err, playerDeleted) {
        if (err) return next(err);
        
        //get new total number of players
        Player.count({}, function(err, totalPlayers) { 
            if (err) return next(err);
            res.render('delete', {playerDeleted, totalPlayers, numberToDelete}); //send results to delete.html view
        });
    });
});

//add page - for adding via query string
app.get('/add', function(req, res, next) {
    let newPlayerDetails = req.query; //get new player details from user-entered query string
    let newPlayer = new Player(newPlayerDetails); //save details to new JSON object
    
    //check if player to be added already exists
    Player.findOne({number:newPlayerDetails.number}, function(err, playerFound) {
        if (err) return next(err);
        
        //set playerExists variable
        var playerExists;
        if (playerFound) {
            playerExists = true;
        } else {
            playerExists = false;
        }
    
        //console.log('playerExists: ' + playerExists);
       
        //attempt to add player to the MongoDB
        if (!playerExists && (newPlayer.number && newPlayer.name)) {
            newPlayer.save(function(err, savedNewPlayer) {
                //console.log('savedNewPlayer: ' + savedNewPlayer);
                if (err) return next(err);
            
                //get new total number of players
                Player.count({}, function(err, totalPlayers) {
                    if (err) return next(err);
                    res.render('add', {newPlayerDetails, savedNewPlayer, totalPlayers, playerExists});
                });
            });   
        } else {
            res.render('add', {newPlayerDetails, playerExists});
        }
    });
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