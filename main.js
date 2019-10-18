const electron = require('electron');

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

  win.on('closed', () => {
    win = null;
  })
}

ipcMain.on('clientID', function(e, clientID){
  const userClientID = clientID;
  console.log(clientID);
  win.loadFile('api.html');
});

ipcMain.on('params', function(e, formData){
  const data = formData;
  console.log(data);
});

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  };
});
