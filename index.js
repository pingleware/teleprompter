"use strict"

const path = require("path");
const {app, BrowserWindow, ipcMain} = require("electron");

let mainWindow;

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 900,
    icon: "assets/teleprompter.ico",
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      preload: path.join(__dirname, "preload.js")
    }
  });
  mainWindow.loadFile("views/index.html");
  mainWindow.on("closed", function () {
    mainWindow = null;
  });
  mainWindow.setMenu(null);
}

app.on("ready", createWindow);
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});
app.on("activate", function () {
    if (mainWindow === null) createWindow();
});
  