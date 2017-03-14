var express = require('express');
var bodyParser = require('body-parser');


var app = express();
var port = process.env.PORT || 3000;
var ip = process.env.IP || 'localhost';

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

app.get('/api', function(req, res) {
  console.log('get request was sent')
  res.status(200).send(teams);
  res.end();
});

app.post('/api', function(req, res) {
  var team = req.body;
  teams.push(team);
  console.log('post request was sent', req.body);
  res.sendStatus(201);
  res.end();
})

app.listen(port);
console.log('Server is listening at port: ' + port);
