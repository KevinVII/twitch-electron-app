const { app, BrowserWindow, ipcMain, webContents } = require('electron')
const axios = require('axios')
const Twitch = require('./api/newTwitchApi')

let mainWindow;

var options = {
  clientId: '',
  clientSecret: '',
  redirectUri: 'http://localhost',
  scopes: []
}

var ttv;


app.on('ready', function() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    webPreferences: {
      nodeIntegration: true
    }
  });
  // and load the index.html of the app.
  mainWindow.loadFile('index.html');

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    mainWindow = null
  })
})

ipcMain.on('clientID', function(e, clientID){
  options.clientId = clientID;
  paramWindow();
});

// Drones ID: 29605116
function paramWindow(){

  // load parameter page
  mainWindow.loadFile('parameters.html');

  ttv = new Twitch(options)

  // Waits for form submit with parameters
  ipcMain.on('streamerName', async function(e, streamerName){

    // Takes in Streamer's display name and returns an array of objects
    // with clip information.
    var testApi = await ttv.getUser({ login: streamerName });
    var clips = await ttv.getClips({broadcaster_id: testApi });
    mainWindow.loadFile('display.html')
    displayClips(clips);
  });

}

// Sends all clip information to be displayed on the clips page
function displayClips(clips){
  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.webContents.send('allClips', clips);
  })
}

function addWindow () {
  // Create the browser window.
  addWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  addWindow.loadFile('index.html')

  // Emitted when the window is closed.
  addWindow.on('closed', () => {
    addWindow = null
  })
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})
