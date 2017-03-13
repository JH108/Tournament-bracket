var express = require('express');
var bodyParser = require('body-parser');


var app = express();
var port = process.env.PORT || 3000;
var ip = process.env.IP || '127.0.0.1';

app.use(bodyParser.json());
app.use(express.static('client'));

app.listen(port, ip);
console.log('Server is listening at port: ' + port);
