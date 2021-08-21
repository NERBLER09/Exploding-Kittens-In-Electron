const { app, BrowserWindow, shell, dialog, Menu, ipcMain, ipcRenderer } = require('electron');
const path = require('path');

try {
  require('electron-reloader')(module)
} catch (_) {}

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

let mainWindow, gameWindow

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    title:"Exploding Kittens In Electron",
    icon: path.join(__dirname, "../assets/favicon.png"), // xLaunch freaks out when running in WSl and crashes with a window icon set (??)
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'titleScreen.html'));

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  // Sets the app menu
  const menuTemplate = Menu.buildFromTemplate(menu);
  Menu.setApplicationMenu(menuTemplate);
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

// Menu for the window
const menu = [
  {
    label: "Game",
    submenu: [
      {
        label: "New Game (From Title Screen)",
        click: () => {
          mainWindow.webContents.executeJavaScript(`localStorage.removeItem("isGameDataSaved")`)
          mainWindow.loadFile(path.join(__dirname, 'titleScreen.html'))
        }
      },
      {
        label: "New Game (From Game Window)",
        click: () => {
          mainWindow.webContents.executeJavaScript(`location.reload()`)
        }
      },
      {type:"separator"},
      {
        label: "Update Game Config",
        click () {
          mainWindow.webContents.send("updateGameConfig")
        }
      },
      {
        label: "Clear Game Config",
        click () {
          mainWindow.webContents.executeJavaScript(`localStorage.removeItem("isGameDataSaved")`)
          mainWindow.webContents.executeJavaScript(`localStorage.removeItem("username")`)
          mainWindow.webContents.executeJavaScript(`localStorage.removeItem("comAmount")`)
        }
      },
      {type:"separator"},
      {
        label: "Quit",
        role: "quit",
        accelerator: 'Ctrl+Q'
      }
    ]
  },
  {
    label: "Window",
    submenu: [
      { role: 'undo' },
      { role: 'redo' },
      { type: 'separator' },
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' },
      { type: 'separator' },
      { role: 'reload' },
      { type: 'separator' },
      { role: 'resetZoom' },
      { role: 'zoomIn' },
      { role: 'zoomOut' },
      { type: 'separator' },
      { role: 'togglefullscreen' }
    ]
  },
  {
    label:"Help",
    submenu: [
      {
        label: "Exploding Kittens",
        click() {
          shell.openExternal("https://www.explodingkittens.com")
        }
      },
      {
        label: "How To Play",

        click() {
          shell.openExternal("https://explodingkittens.com/how-to-play")
        }
      },
      { type: 'separator' },
      {
          label: "About",
          // click: function () {
          //     dialog.showMessageBox({
          //         type: "info",
          //         title: "Exploding Kittens",
          //         message: "About",
          //         detail: `Exploding Kittens In Electron\nVersion: 1.0.0.0\nPlease note that "Exploding Kittens In Electron" is still user development\nTo give feedback go to Options -> Github Repo ->\nErrors -> New Error To Submit A New Error`,
          //     });
          // }
          click () {
            mainWindow.webContents.send("showAboutMessageBox")
          }
      },

    ]
  },
  {
    label: "Other",
    submenu: [
      {type:"separator"},
      {
        label: "Github",

        click() {
          shell.openExternal("https://www.github.com/nerbler09/exploding-kittens-in-electron")
        }
      },
      { type: "separator" },
      {
        label: "Open Issuse",
        click() {
          shell.openExternal("https://github.com/NERBLER09/Exploding-Kittens-In-Electron/issues/new")
        } 
      },
      { type: "separator" },
      {
        label: "Toggle Dev Tools",
        role: "toggleDevTools"
      },
    ]
  },
]

ipcMain.on("createGameWindow", () => {
  // Loads the game window
  mainWindow.loadFile(path.join(__dirname, 'gameWindow.html'));
})