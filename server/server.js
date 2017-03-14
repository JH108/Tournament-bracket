var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');


var app = express();
var port = process.env.PORT || 3000;
var ip = process.env.IP || 'localhost';


/************* Database *************/
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/tournamentdb');

var db = mongoose.connection;

var teamSchema = mongoose.Schema({
  name: String,
  score: Number,
  currentOpponent: String
});

var Team = mongoose.model('Team', teamSchema);

// var teams = [
//   {
//     name: 'CHSM'
//   },
//   {
//     name: 'HCYA'
//   },
//   {
//     name: 'Golden State'
//   }
// ];

app.use(bodyParser.json());
app.use(express.static('client'));

app.get('/api', function(req, res) {
  //console.log('get request was sent')
  Team.find(function(err, teams) {
    if (err) {
      res.sendStatus(500);
      console.error(err);
    } else {
      //console.log(teams);
      res.status(200).send(teams);
    }
    res.end();
  });
});

app.post('/api', function(req, res) {
  var team = req.body;
  var newTeam = new Team({
    name: team.name
  });
  newTeam.save(function(err, team) {
    if (err) {
      res.sendStatus(500);
      console.error(err);
    } else {
      res.sendStatus(201);
      //console.log('post request was sent', req.body);
    }
    res.end();
  });
})

app.listen(port);
console.log('Server is listening at port: ' + port);
