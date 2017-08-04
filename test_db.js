var Player = require('./models/player.js');

//get number of mongoDB documents
Player.count((err, result) => {
    if (err) {
        console.log(err); //output error if one occurred
    } else {
        console.log('total number of mongoDB docs: ' + result); //otherwise print number of mongoDB documents in database
    }
});

// find all documents 
Player.find((err, result) => {
    if (err) {
        console.log(err); //output error if one occurred
    } else {
        console.log('array of mongoDB docs: \n' + result); //otherwise output the array of documents
    }
});