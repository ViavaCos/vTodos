import { Component } from 'react'
import './index.scss'

type stateType = {
  checked: boolean
}

type propsType = {
  checked: boolean
  onClick: Function
}

interface CheckBox {
  state: stateType
  props: propsType
}

class CheckBox extends Component {
  constructor(props:object){
    super(props)
    this.state = {
      checked: this.props.checked || false
    }
  }

  // 选择|取消选择
  handleChecked(){
    this.props.onClick()
    this.setState({
      checked: !this.state.checked
    })
  }

  render(){
    // 设置状态(默认|解决)
    const checkboxClass = `check-box ${this.state.checked ? '--solved':'--default'}`

    return <div className={checkboxClass} onClick={this.handleChecked.bind(this)}></div>
  }
}

export default CheckBox
