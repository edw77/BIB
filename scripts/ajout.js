const remote = require('electron').remote;
let win = remote.getCurrentWindow();

function reset()
{
  document.getElementById("titre").value = "";
  document.getElementById("auteur").value = "";
  document.getElementById("genre").value = "";
  document.getElementById("annee").value = "";
  document.getElementById("cover").files[0] = null;
}

function add(filename,data)
{
  const fs = require('fs');

  var path = "./files/"+filename+".txt";
  fs.appendFile(path,","+data, 'utf8', (err) => {
if (err) throw err
console.log(filename+" sauvegardé")});
}

function copier_fichier(filePath,fileName)
{
  const fs = require('fs');
  // Copy the chosen file to the application's data path
  fs.copyFile(filePath,"./resources/app/files/covers/"+fileName, (err) => {
    if (err) throw err;
    console.log('Image ' + fileName + ' stored.');

    // At that point, store some information like the file name for later use
  });
}

function confirmer()
{
  var titre = document.getElementById("titre").value;
  var auteur = document.getElementById("auteur").value;
  var genre = document.getElementById("genre").value;
  var annee = document.getElementById("annee").value;
  var cover = document.getElementById("cover").files[0].path;

  var warning = confirm("Vous vous apprêtez à ajouter un livre avec les informations suivantes :\nTitre : "+titre+" \nAuteur : "+auteur+" \nGenre : "+genre+" \nAnnée : "+annee+" \n");

  if (warning == true)
  {
    add("noms",titre);
    add("auteur",auteur);
    add("genre",genre);
    add("year",annee);
    add("dispo","1");
    copier_fichier(cover,titre+".jpg");
    reset();
  }

}
