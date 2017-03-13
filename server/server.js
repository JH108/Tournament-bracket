var express = require('express');
var bodyParser = require('body-parser');


var app = express();
var port = process.env.PORT || 3000;
var ip = process.env.IP || '127.0.0.1';

var teams = [
  {
    name: 'CHSM'
  },
  {
    name: 'HCYA'
  },
  {
    name: 'Golden State'
  }
];

app.use(bodyParser.json());
app.use(express.static('client'));

app.get('/', function(req, res) {
  console.log(teams)
  res.send(200, teams);
  res.end(teams);
});

app.post('/', function(req, res) {
  var team = req.body.data;
  teams.push(team);
  console.log(req.body.data);
  res.send(201);
  res.end();
})

app.listen(port, ip);
console.log('Server is listening at port: ' + port);
