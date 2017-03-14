const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
var mainWindow = null;
app.on("ready", function () {
	mainWindow = new BrowserWindow({
		height: 700, 
		width: 1100,
		maximizable: false,
		resizable: false,
		autoHideMenuBar: true
	});
	mainWindow.loadURL("file://"+__dirname+"/index.html");
});
