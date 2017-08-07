var express = require('express');
var app = express();

var serverPort = process.env.PORT || 5001;

app.use(express.static(__dirname + '/dist'));

app.listen(serverPort);