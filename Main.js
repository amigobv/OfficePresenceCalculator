const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
var mainWindow = null;
app.on("ready", function () {
	mainWindow = new BrowserWindow({
		height: 800, 
		width: 1400,
		maximizable: false,
		resizable: false,
		autoHideMenuBar: true,
		icon: __dirname+"./logo.ico"
	});
	mainWindow.loadURL("file://"+__dirname+"/index.html");
});
