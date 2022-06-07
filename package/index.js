const { app, BrowserWindow, ipcMain, Menu, Notification, Tray }  = require('electron')
const path = require('path')

function createWindow () {
  const win = new BrowserWindow({
    width: 900, // 窗口宽度
    height: 600, // 窗口高度
    // minWidth: 901,
    // minHeight: 601,
    transparent: true, // 透明边框
    webPreferences: { // 开启网页功能设置
      nodeIntegration: true, //是否完整的支持 node. 默认值为true
      nodeIntegrationInWorker: false,// 是否在Web工作器中启用了Node集成
      preload: path.join(__dirname, 'preload.js') // 预加载的js文件
    },
    resizable: false,
    // useContentSize: true,
    // backgroundColor: '#2e2c29', // 背景颜色
    opacity: 1, // 窗体透明度 0~1
    icon: './icon.png', // 应用图标
    frame: false // 设置无边框窗口（无工具栏、边框、其它图形化外壳）
  })

  // 监听关闭事件
  ipcMain.on('close-app', () => {
    if (win) {
      win.close()
    }
  })
  ipcMain.on('min-app', () => {
    win.minimize()
  })

  // 创建应用图标
  // const appIcon = new Tray('./icon.png')

  // 设置无工具栏
  // Menu.setApplicationMenu(null)

  win.loadFile('build/index.html') // 正式
  // win.loadFile('test.html') // 直接报错 `Not allowed to load local resource` 就很离谱
  // win.loadFile('package/test.html') // 测试专用

  // win.webContents.on('did-finish-load', () => {
  //   win.webContents.send('ping', { text: 'This is a text.'})
  // })

  // win.webContents.on('mineclick', () => {
  //   console.log('Click MEssage received.!');
  // })
}

// notification
// function showNotification () {
//   const notification = {
//     title: 'basic notification',
//     body: 'This is a notification.'
//   }
//   new Notification(notification).show()
// }

let tray = null

app.whenReady().then(() => {
  console.log('start createWindow...')
  createWindow()

  // 据说是解决win10的notification问题, 目前用不到
  // console.log(process.execPath)
  // if(process.platform === 'win32') {
  //   app.setAppUserModelId(process.execPath)
  // }
}).then(() => {
  console.log('start showNotification...')
  // showNotification()

  tray = new Tray('./icon.png')
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Item1', type: 'radio' }
  ])
  tray.setToolTip('This is my vTodos')
  tray.setContextMenu(contextMenu)

  // console.log(dialog.showOpenDialog({ properties: ['openFile', 'multiSelections'] }))
  // dialog.showMessageBoxSync({ 
  //   title: '测试弹窗',
  //   message: '这是message',
  //   buttonLabel: '确认label'
  // })

  // require('electron').dialog.showMessageBox({
  //   title: '标题',
  //   message: '内容'
  // })
})

app.on('window-all-closed', () => {
  if(process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if(BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})


// // 快捷键
// const menu = new Menu()
// menu.append(new MenuItem({
//   label: 'Electron',
//   submenu: [{
//     role: 'help',
//     accelerator: process.platform === 'darwin' ? 'Alt+Cmd+I' : 'Alt+Shift+I',
//     click: async () => { 
//       console.log('Electron rocks!')
      
//       // 选择文件夹
//       const res = await dialog.showOpenDialog({
//         properties: ['openDirectory']
//       })
//       console.log('choose Dir', res, ' \nAddress:', !res.canceled && res.filePaths[0])
//     }
//   }]
// }))
// Menu.setApplicationMenu(menu)

// function test () {
//   console.log('test');
// }

// exports.test = test
