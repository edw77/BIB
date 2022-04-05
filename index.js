/* Prompt for Electron - (c) 2017 Scriptol.coml - MIT License */

const path = require("path")
const { ipcMain, app, BrowserWindow } = require("electron")


/* DIALOG BOX PART */

var promptWindow;
var promptOptions
var promptAnswer;

// Crearing the dialog

function promptModal(parent, options, callback) {
  promptOptions = options;
  promptWindow = new BrowserWindow({
    width:360, height: 120,
    'parent': parent,
    'show': false,
    'modal': true,
    frame : false,
    'alwaysOnTop' : true,
    'title' : options.title,
    'webPreferences' : {
      "nodeIntegration":true,
      "sandbox" : false
    }
  });
  promptWindow.on('closed', () => {
    promptWindow = null
    callback(promptAnswer);
  })

  // Load the HTML dialog box
  promptWindow.loadURL(path.join(__dirname, "./pages/emprunt.html"))
  promptWindow.once('ready-to-show', () => { promptWindow.show() })
}

// Called by the dialog box to get its parameters

ipcMain.on("openDialog", (event, data) => {
    event.returnValue = JSON.stringify(promptOptions, null, '')
})

// Called by the dialog box when closed

ipcMain.on("closeDialog", (event, data) => {
  promptAnswer = data
})

// Called by the application to open the prompt dialog

ipcMain.on("prompt",  (event, notused) => {
	promptModal(win, {
	    "title": "Formulaire d'emprunt",
	    "label":"Remplissez les informations suivantes:",
	    "value":"John Doe",
	    "ok": "ok"
	    },
	    function(data) {
	       event.returnValue = data
        }
    );
});

/*  DEMO APPLICATION PART */

let win
function createWindow () {
  win = new BrowserWindow({
      width: 1024, height: 600,
      "show":false,
      title:"DEMO",
      webPreferences : {
          nodeIntegration:true,
          sandbox: false
      }
  });
  win.setMenu(null)
  win.loadURL(path.join(__dirname, 'index.html'))
  win.show()
  win.on('closed', () => { win = null  })
}
app.on('ready', createWindow)
app.on('quit', function () {});
app.on('window-all-closed', () => {
  app.quit()
  process.exit(1)
})
