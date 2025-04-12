const {app,BrowserWindow, ipcMain, nativeImage, Tray, Menu} = require("electron");
const path = require("path");
let win;
const createWindow = () => {
    win = new BrowserWindow({
        width : 800,
        height : 600,
        webPreferences : {
            preload : path.join(__dirname, "preload.js")
        }
    });

    win.loadFile('index.html');
    win.on('close', (e) => {
        if(!app.isQuitting) {
        e.preventDefault();
        win.hide(); // Hide window
        } else {
            win = null;
        }
    })
}

let tray;
app.whenReady().then(()=>{

    ipcMain.handle('ping' , () => 'pong');
    const icon = nativeImage.createFromPath('img.jpeg');
    tray = new Tray(icon);

    const contextMenu = Menu.buildFromTemplate([
        {label : 'Show-App' , click : () => win.show()},
        {label : 'Quit' , click : () => {app.isQuitting = true; tray.destroy(); app.quit();}}
    ])
    tray.setContextMenu(contextMenu);
    tray.setToolTip("This is my Application")
    tray.setTitle("This is my title")
    createWindow();

    app.on('activate' , () => {
        if(BrowserWindow.getAllWindows.length === 0) createWindow();
    })
}).catch((err)=> { console.log("Error while starting electron"); console.log(err) });

app.on('window-all-closed' , (e)=> {
    // e.preventDefault();
    if(process.platform !== 'darwin') app.quit();
})
