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


//console.log(this.getAll());
//console.log('Number of Players: ' + this.numPlayers() + '\n');
//console.log('Get all players: \n' + JSON.stringify(this.getAll()) + '\n');
//console.log('Get player number 2: \n' + JSON.stringify(this.get('2')) + '\n');
//console.log(this.delete('2'));