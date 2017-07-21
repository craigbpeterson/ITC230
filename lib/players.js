//create a list of Sounders Players
var players = [
    { number:'2', name:'Clint Dempsey', position:'Forward', goals:'7', hometown:'Nacogdoches, TX' },
    { number:'6', name:'Osvaldo Alonso', position:'Midfielder', goals:'1', hometown:'San Cristobal, Cuba' },
    { number:'24', name:'Stefan Frei', position:'Goalkeeper', goals:'0', hometown:'Altstaetten, Switzerland' }
];

//create methods to be available outside this module
exports.numPlayers = function() {
    return players.length;
};

exports.getAll = function() {
    return players;
};

exports.get = function(number) {
    return players.find(function(player) {
        return player.number === number;
    });
};

exports.delete = function(number) {
    //use the .filter() array method to create a new array with all players except the player whose number was passed to the delete method
    let newPlayers = players.filter(function(player) {
        return player.number !== number; 
    });
    
    players = newPlayers; //set the players variable to the newPlayers array
};

exports.add = function(newPlayerDetails) {
    const originalTotalPlayers = players.length; //get original total number of players
    
    //determine if player to be added already exists
    let playerExists = false;
    if (this.get(newPlayerDetails.number)) {playerExists = true;}
    
    if (!playerExists && (newPlayerDetails.number && newPlayerDetails.name)) { 
        players.push(newPlayerDetails);
    }
    
    return {added: originalTotalPlayers !== players.length, totalPlayers: players.length, playerExists};
};
