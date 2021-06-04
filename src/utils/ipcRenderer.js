function ipcRenderer(event){
  if(window.electron) {
    window.electron.ipcRenderer.send(event)
  }
}

export default ipcRenderer
