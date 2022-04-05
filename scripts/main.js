
var names;
var authors;
var years;
var genres;
var covers;
var dispo;
var etat;
// Bonne chance !
var j;
var mod=[];
mod[0]=-1;

//Date
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = dd + '/' + mm + '/' + yyyy;

//Date

var tab = document.getElementById("list");

const remote = require('electron').remote;
const { ipcRenderer } = require("electron");
let win = remote.getCurrentWindow();








function sauvegarder()
{
  write("noms",names);
  write("auteur",authors);
  write("genre",genres);
  write("year",years);
  write("dispo",dispo);
  alert("Données sauvegardées avec succès !");
}

function write(filename,data)
{
  const fs = require('fs');
  var path = "./files/"+filename+".txt";
  fs.writeFile(path,data, 'utf8', (err) => {
if (err) throw err
console.log(filename+" sauvegardé")});
}

function load_names()
{
  const fs = require('fs');
  fs.readFile('./files/noms.txt','utf8', function(err,namez) {
      names = namez.split(",");
    });
}

function load_genres()
{
  const fs = require('fs');
  fs.readFile('./files/genre.txt','utf8', function(err,genrez) {
      genres = genrez.split(",");
    });
}

function load_authors()
{
  const fs = require('fs');
  fs.readFile('./files/auteur.txt','utf8', function(err,authorz) {
      authors = authorz.split(",");
    });
}

function load_years()
{
  const fs = require('fs');
  fs.readFile('./files/year.txt','utf8', function(err,yearz) {
      years = yearz.split(",");
    });
}

function load_dispo()
{
  const fs = require('fs');
  fs.readFile('./files/dispo.txt','utf8', function(err,data) {
      dispo = data.split(",");
    });
}

function load()
{
  load_dispo();
  load_names();
  load_years();
  load_authors();
  load_genres();
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
      tab.removeChild(row[x+2]);
      mod[0]=x;
      names.splice(x,1);
      years.splice(x,1);
      genres.splice(x,1);
      authors.splice(x,1);
      alert("Livre supprimé");
    }
    else {
      var compt = 0;
      while (compt < mod.length)
      {
        if(mod[compt]<x)
        {x = x - 1;}
        compt++;
      }
      tab.removeChild(row[x+2]);
      names.splice(x,1);
      mod[compt]=x;
      alert("Livre supprimé");
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
  button_emp.onclick = function () { emprunter(c); };
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
  var load_button = document.getElementById('load');
  load_button.disabled = true;
  var save_button = create_button("Sauvegarder");

    while( c < names.length )
  {
    show_one(c);
    c++;
  }
}

function add_emprunt(nom,c,dretour)
{
  const fs = require('fs');
  write("dispo",dispo);
  data = today + "," + names[c] + "," + nom + "," + dretour + "," + "0" + "," + c.toString() + ";";
  //01/06/2020,Da Vinci Code,Jean-Michel Dujardin,15/06/2020,10/06/2020;
  fs.appendFile('./files/emprunts.txt',data,'utf8', (err) => {
if (err) throw err
alert("Emprunt de " + nom + " , à rendre au plus tard le " + dretour + " a  été enregistré");
});
}

function formulaire(c) {
  var answer = ipcRenderer.sendSync("prompt", "");
  if(answer.split(",") != "")
    {
      answ = answer.split(",");
      dispo[c] = 0;
      add_emprunt(answ[0],c,answ[1]);
    }
}

function emprunter(c)
{
  if (dispo[c] == 1)
  {
    formulaire(c);
  }
  else
  {
    alert("Ce livre n'est pas disponible");
  }

}
