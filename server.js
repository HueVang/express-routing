var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

// var songs = require('./data');
var songs = [];

var app = express();

app.use(express.static('public'));
// convert any URL encoded body into a JavaScript object
// added to req.body
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.get('/songs', function(req, res) {
  res.send(songs);
});

app.post('/songs', function(req, res) {
  console.log('req.body',req.body);

  var string = "string";

  var titleArr = [];

  songs.forEach(function(song) {
    titleArr.push(song.title);
  });

  var date = Date();
  req.body['dateAdded'] = date;

  if (typeof req.body.title != string||typeof req.body.artist  != string||typeof req.body.album != string) {
    res.sendStatus(400);
  } else if (req.body.title.trim() == "" ||req.body.artist.trim() == "" ||req.body.album.trim() == "") {
    res.sendStatus(400);
  } else if (titleArr.includes(req.body.title)) {
    res.sendStatus(400);
  } else {
    songs.push(req.body);
    res.sendStatus(200);
  }

  titleArr = [];

})

app.listen(3000);
