import { Component } from 'react'
import '../../styles/header/index.scss'
import '../../styles/cool.scss'
import ipcRenderer from '../../utils/ipcRenderer'
import Search from '../search'

class Header extends Component {
  constructor(){
    super()
    this.state = {
      isDesktop: window.electron !== undefined
    }
  }

  // 关闭当前窗口
  handleClose(){
    ipcRenderer('close-app')
  }

  // 最小化
  handleMiNiSize(){
    ipcRenderer('min-app')
  }

  // 渲染桌面程序的操作栏
  renderDesktopOperation(){
    return this.state.isDesktop ?
      (
        <div className="operation">
          <div className="mini-btn" title="最小化" onClick={this.handleMiNiSize.bind(this)}>-</div>
          <div className="close-btn" title="关闭" onClick={this.handleClose.bind(this)}>✗</div>
        </div>
      )
      : ''
  }

  render(){
    const { getDatas } = this.props
    const img = require('../../assets/imgs/avatar.png')
    const headIcon = {
      backgroundImage: `url(${img.default})`
    }
    const refresh = () => {
      getDatas()
    }
    return (
      <div className="todos-header">
        <div className="starry"></div>
        <div className="todos-logo viavacos" onClick={refresh}></div>
        <p className="todos-title" onClick={refresh}>
          微土豆
          <span className="version">{ this.state.isDesktop ? 'pc' : 'web' }</span>
        </p>
        <div className="search">
          <Search getDatas={getDatas}></Search>
        </div>
        <div className="user-info">
          <div className="head-icon" style={headIcon}></div>
          <div className="user-name"><span>你的昵称</span></div>
        </div>
        { this.renderDesktopOperation() }
      </div>
    )
  }
}

export default Header