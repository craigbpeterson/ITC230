var mongoose = require('mongoose');
var credentials = require('../lib/credentials');

// remote db connection settings. For security, connectionString should be in a separate file not committed to git
var options = { server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } } };
mongoose.connect(credentials.connectionString, options);

var conn = mongoose.connection; 
conn.on('error', console.error.bind(console, 'connection error:'));

// define player model in JSON key/value pairs
// values indicate the data type of each key
var playerSchema = mongoose.Schema({
  number: { type: String, required: true },
  name: { type: String, required: true },
  position: String,
  goals: String,
  hometown: String,
  userAdded: Boolean,
  imgsrc: String
}); 

module.exports = mongoose.model('Player', playerSchema);