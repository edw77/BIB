var emprunts;
var txt_emprunts;
var emp=[];
var dispo;

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = dd + '/' + mm + '/' + yyyy;

const remote = require('electron').remote;
let win = remote.getCurrentWindow();

function write(filename,data)
{
  const fs = require('fs');
  var path = "./files/"+filename+".txt";
  fs.writeFile(path,data, 'utf8', (err) => {
if (err) throw err
console.log(filename+" sauvegardé")});

}


function create_button(txt,c)
{
  var button = document.createElement("button");
  button.id = txt;
  var button_txt = document.createTextNode(txt);
  button.appendChild(button_txt);

  return button;
}

function rendre(c,tr,callback)
{
  var warning = confirm("En appuyant sur oui, vous confirmez que ce livre a été rendu\n");
  if(warning == true)
  {
    i = 0;
    dispo[emp[c][5]]=1;
    emp[c][4] = today;
    txt_emprunts = "";
    while (i < emp.length)
    {
      if(i == 0)
        write("dispo",dispo);
      
      txt_emprunts = txt_emprunts + emp[i] + ";";
      i++;
    }
    var td = document.getElementById(c.toString());
    var bouton = document.getElementById('r' + c.toString());
    bouton.disabled = true;
    var date_today = document.createTextNode(today);
    td.appendChild(date_today);
    callback("emprunts",txt_emprunts);

  }
}

function create_line_txt_opt(tr,txt,c)
{
  if(txt.localeCompare("0") == 0 )
  {
    var bouton_rendre = create_button("Rendre");
    var el = document.createElement("td");
    el.id = c.toString();
    bouton_rendre.id = "r" + c.toString();
    bouton_rendre.onclick = function () { rendre(c,tr,write); };
    el.appendChild(bouton_rendre);
    tr.appendChild(el);
  }
  else
  {
    create_line_txt(tr,txt,c);
  }
}

function create_line_txt(tr,txt,id)
{
  var element = document.createElement("td");
  var element_txt = document.createTextNode(txt);

  if (id != null)
  {
    var ide = id.toString();
    element.id = ide;
  }
  tr.appendChild(element);
  element.appendChild(element_txt);
}

function load_dispo()
{
  const fs = require('fs');
  fs.readFile('./files/dispo.txt','utf8', function(err,data) {
      dispo = data.split(",");
    });
}

function load_data()
{
  const fs = require('fs');
  load_dispo();
  fs.readFile('./files/emprunts.txt','utf8', function(err,data) {
      txt_emprunts = data;
      emprunts = data.split(";");
    });
}

function show_one(c)
{
  emp[c] = emprunts[c].split(",");
  var tr = document.createElement("tr");
  var tab = document.getElementById("list");

  create_line_txt(tr,emp[c][0]); //colonnes
  create_line_txt(tr,emp[c][1]);
  create_line_txt(tr,emp[c][2]);
  create_line_txt(tr,emp[c][3]);
  create_line_txt_opt(tr,emp[c][4],c);

  tab.appendChild(tr);
}

function show()
{
  var c=0;
  var load_button = document.getElementById('load');
  load_button.disabled = true;
  load_button.class = "null";
  var save_button = create_button("Sauvegarder");

    while( c < emprunts.length -1 )
  {
    show_one(c);
    c++;
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
