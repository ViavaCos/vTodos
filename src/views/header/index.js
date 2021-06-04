import { Component } from 'react'
import './index.css'
import '../../style/cool.css'
import ipcRenderer from '../../utils/ipcRenderer'

class Header extends Component {
  constructor(){
    super()
    this.state = {}
  }

  // 关闭当前窗口
  handleClose(){
    ipcRenderer('close-app')
  }

  // 最小化
  handleMiNiSize(){
    ipcRenderer('min-app')
  }

  render(){
    return (
      <div className="todos-header">
        <div className="starry"></div>
        <div className="todos-logo viavacos"></div>
        <p className="todos-title">微土豆</p>
        <div className="mini-btn" title="最小化" onClick={this.handleMiNiSize.bind(this)}>-</div>
        <div className="close-btn" title="关闭" onClick={this.handleClose.bind(this)}>x</div>
      </div>
    )
  }
}

export default Header