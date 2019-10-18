const electron = require('electron');
const Twitch = require('./newTwitchApi')


const { app, BrowserWindow, ipcMain } = electron;

let win;

function createWindow (){
  win = new BrowserWindow({
    width: 1280,
    height: 720,
    webPreferences: {
      nodeIntegration: true
    }
  });
  win.loadFile('index.html');
  win.webContents.openDevTools()

  win.on('closed', () => {
    win = null;
  })
}


ipcMain.on('clientID', async function(e, clientID){
  clientID;
  paramWindow(clientID);
});

async function paramWindow (clientID){
  var options = {
    clientId: clientID,
    clientSecret: '',
    redirectUri: 'http://localhost',
    scopes: []
  }

  var ttv = new Twitch(options);

  win.loadFile('api.html');

  var para = '';

  ipcMain.on('params', function(e, formData){

    var testApi = ttv.getUser({ login: formData });

    testApi.then((result) => {
      console.log('hello ' + JSON.parse(result));
    })
  });
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  };
});
