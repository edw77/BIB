const remote = require('electron').remote;
let win = remote.getCurrentWindow();
var quot = document.getElementById('quote');
var auth = document.getElementById('author');
load_data(show);

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function load_data(callback)
{
  const fs = require('fs');
  fs.readFile('./files/quotes.txt','utf8', function(err,data) {
    if (err) throw err;
    callback(data.split(";"),getRandomInt(data.split(";").length - 1));
    });
}

function show(x,n)
{
  var author = document.createTextNode(x[n].split("/")[1]);
  var quote = document.createTextNode(x[n].split("/")[0]);

  quot.appendChild(quote);
  auth.appendChild(author);
}
