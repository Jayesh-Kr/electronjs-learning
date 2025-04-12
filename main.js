const {app,BrowserWindow, ipcMain, nativeImage, Tray, Menu} = require("electron");
const path = require("path");

const createWindow = () => {
    const win = new BrowserWindow({
        width : 800,
        height : 600,
        webPreferences : {
            preload : path.join(__dirname, "preload.js")
        }
    });

    win.loadFile('index.html')
}

let tray;
app.whenReady().then(()=>{

    ipcMain.handle('ping' , () => 'pong');
    const icon = nativeImage.createFromPath('img.jpeg');
    tray = new Tray(icon);

    const contextMenu = Menu.buildFromTemplate([
        {label : 'Item1', type : 'radio'},
        {label : 'Item2', type : 'radio'},
        {label : 'Item3', type : 'radio', checked : true},
        {label : 'Item4', type : 'radio'},
    ])
    tray.setContextMenu(contextMenu);
    tray.setToolTip("This is my Application")
    tray.setTitle("This is my title")
    createWindow();
    app.on('activate' , () => {
        if(BrowserWindow.getAllWindows.length === 0) createWindow();
    })
}).catch((err)=> { console.log("Error while starting electron"); console.log(err) });

app.on('window-all-closed' , ()=> {
    if(process.platform !== 'darwin') app.quit();
})
