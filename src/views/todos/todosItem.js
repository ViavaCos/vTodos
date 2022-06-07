import { Component  } from 'react'
import '../../styles/todos/todosItem.scss'
import CheckBox from '../../components/checkbox/index.tsx'

class ToDosItem extends Component {

  constructor(){
    super()
    this.state = {
      isEdit: false,
      penddingContent: ''
    }
  }

  // 修改状态
  changeItemStatus(is_finish){
    // 已完成，不可编辑
    if(is_finish) return

    this.setState({
      isEdit: !this.state.isEdit
    })
  }

  // 标记为已完成
  makeAsFinished() {
    this.props.parent.makeAsFinished(this.props.data.id)
  }

  // 删除
  delToDoItem(){
    this.props.parent.delToDo(this.props.data.id)
  }

  // 修改
  changeTodoContent(){
    if(!this.state.penddingContent || !this.state.penddingContent.trim()) {
      this.setState({ isEdit: false })
      return
    }

    this.props.parent.changeTodo(this.props.data.id, this.state.penddingContent)

    this.setState({
      isEdit: false,
      penddingContent: ''
    })
  }

  // 内容变更，更新数据
  handleContentChange(e) {
    this.setState({ penddingContent: e.nativeEvent.target.value })
  }

  renderEditIcon(is_finish){
    return !is_finish
    ? (
      <div className="edit-icon">
        <i className="iconfont i-edit"></i>
      </div>
    )
    :
    (
      <div className="edit-icon">
        <i className="iconfont i-edit" style={{'color':'gray'}}></i>
      </div>
    )
  }

  render(){
    const data = this.props.data
    return (
      this.state.isEdit
      ? (<div className="todos-item todos-item-edit">
          <input className="edit-content" defaultValue={data.content} type="text" onBlur={this.handleContentChange.bind(this)}/>
          <button className="solve-icon" onClick={this.changeTodoContent.bind(this)}>💾</button>
          <button className="close-icon" title="取消" onClick={this.changeItemStatus.bind(this, 0)}>x</button>
        </div>)
      : (<div className={'todos-item ' + (data.is_finish ? 'is-finish' : '')}>
          <div className="item-content" onClick={this.changeItemStatus.bind(this, data.is_finish)}>{ data.content }</div>
          { this.renderEditIcon(data.is_finish) }
          <div className="solve-icon">
            <CheckBox title={ data.is_finish ? '标记为未完成' : '标记为已完成' } checked={data.is_finish} onClick={this.makeAsFinished.bind(this)}></CheckBox>
          </div>
          <button className="close-icon" title="删除" onClick={this.delToDoItem.bind(this)}>
            <i className="iconfont i-ashbin"></i>
          </button>
        </div>)
    )
  }
}

export default ToDosItem

// const ToDoSItem = ({data}) => {
//   return (
//     <div className={'todos-item ' + (data.is_finish ? 'is-finish' : '')}>
//       <div className="item-content">{ data.content }</div>
//       <button className="solve-icon" onClick={() => {
//         console.log(data.id);
//       }}>√</button>
//       <button className="close-icon">x</button>
//     </div>
//   )
// }
// export default ToDoSItem
