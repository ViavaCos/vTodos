import { Component } from 'react'
import './index.scss'
import '../../style/cool.scss'
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
    return (
      <div className="todos-header">
        <div className="starry"></div>
        <div className="todos-logo viavacos"></div>
        <p className="todos-title">
          微土豆
          <span className="version">{ this.state.isDesktop ? 'pc' : 'web' }</span>
        </p>
        <div className="search">
          <Search getDatas={getDatas}></Search>
        </div>
        { this.renderDesktopOperation() }
      </div>
    )
  }
}

export default Header