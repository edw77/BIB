
var names;
var authors;
var years;
var covers;
var dispo;
var etat;

var j;
var mod=[];
mod[0]=-1;

var tab = document.getElementById("list");


const remote = require('electron').remote;
let win = remote.getCurrentWindow();

function load_names()
{
  const fs = require('fs');
  fs.readFile('./files/noms.txt','utf8', function(err,namez) {
      names = namez.split("\n");
    });
}

function load_genres()
{
  const fs = require('fs');
  fs.readFile('./files/genre.txt','utf8', function(err,genrez) {
      genres = genrez.split("\n");
    });
}

function load_authors()
{
  const fs = require('fs');
  fs.readFile('./files/auteur.txt','utf8', function(err,authorz) {
      authors = authorz.split("\n");
    });
}

function load_years()
{
  const fs = require('fs');
  fs.readFile('./files/year.txt','utf8', function(err,yearz) {
      years = yearz.split("\n");
    });
}

function load()
{
  load_names();
  load_years();
  load_authors();
  load_genres();

  return names.length;
}

function create_line_txt(tr,txt)
{
  var element = document.createElement("td");
  var element_txt = document.createTextNode(txt);
  tr.appendChild(element);
  element.appendChild(element_txt);
}

function create_line_img(tr,path)
{
  var cover = document.createElement("td");
  var img = document.createElement("img");
  var path = "../files/covers/" +path+ ".jpg";
  img.src = path;
  img.alt = "couverture introuvable";
  tr.appendChild(cover);
  cover.appendChild(img);
}

function supprimer(x)
{
  var warning = confirm("Voulez-vous vraiment supprimer ce livre de la liste ?");
  var tab = document.getElementById("list");
  var row = tab.childNodes;
  if (warning == true) {
    if (mod[0] == -1)
    {
      alert("Livre supprimé - No mod before");
      tab.removeChild(row[x+2]);
      mod[0]=x;
    }
    else {
      var compt = 0;
      while (compt < mod.length)
      {
        if(mod[compt]<x)
        {x = x - 1;}
        compt++;
      }
      alert("Livre supprimé - mod before" + compt);
      tab.removeChild(row[x+2]);
      mod[compt]=x;

      }
    }

  }

function create_button(txt,c)
{
  var button = document.createElement("button");
  button.id = txt;
  var button_txt = document.createTextNode(txt);
  button.appendChild(button_txt);

  return button;
}

function create_line_options(tr,c)
{
  var button_supp = create_button("supprimer",c);
  button_supp.onclick = function () { supprimer(c); };
  var button_emp = create_button("emprunter",c);
  var el = document.createElement("td");
  el.appendChild(button_supp);
  el.appendChild(button_emp);
  tr.appendChild(el);

}


function show_one(c)
{
  var tr = document.createElement("tr");
  var tab = document.getElementById("list");

  create_line_img(tr,names[c]);
  create_line_txt(tr,names[c]); //colonne titres
  create_line_txt(tr,authors[c]); //colonne auteurs
  create_line_txt(tr,genres[c]);
  create_line_txt(tr,years[c]);
  create_line_options(tr,c); //colonne options

  tab.appendChild(tr);
}

function remove_element(id,parent_id)
{
  var button = document.getElementById(id);
  var div = document.getElementById(parent_id);
  div.removeChild(button);
}

function show()
{
  var c=0;
  remove_element('load','content');

  while( c < names.length )
  {
    show_one(c);
    c++;
  }
}

function emprunter()
{
  console.log("Ti vé emprunter hein ?");
}
