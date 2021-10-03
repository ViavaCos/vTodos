import { Component } from 'react'
import '@/styles/todos/todos.scss'
import ToDosItem from './todosItem'
import Header from '../header'
import MyDialog from '@/utils/dialog.tsx'
import { getTodosList, updateTodo, addTodo, deleteTodo, finishTodo } from '@/api/todo'
const Dialog = new MyDialog()

class ToDos extends Component {
  constructor(){
    super()
    this.state = {
      todoData: [
        { id: 1, content: 'test1', is_finish: 0 },
        { id: 2, content: 'test2', is_finish: 1 },
        { id: 3, content: 'test3', is_finish: 0 }
      ],
      paddingAddedText: '',
      showLoading: false, // 是否显示loading
      debounceFlag: null // 防抖参数
    }
  }

  /**
   * 标为已完成
   * @param {number} id 任务id 
   */
  makeAsFinished(id) {
    const { todoData } = this.state
    todoData.forEach(async (item, idx) => {
      if(item.id === id) {
        // todoData[idx].is_finish = todoData[idx].is_finish == 1 ? 0 : 1
        const res = await finishTodo({
          id: item.id,
          is_finish: todoData[idx].is_finish === 1 ? 0 : 1
        })
        if(res.code !== 200) return
        this.getDataList()
      }
    })
    // this.setState({todoData})
  }

  /**
   * 删除任务
   * @param {number} id 任务id 
   */
  delToDo(id){
    Dialog.open(() => {
      const { todoData } = this.state
      todoData.forEach(async (item, idx) => {
        if(item.id === id) {
          // todoData.splice(idx, 1)
          const res = await deleteTodo({ id })
          console.log(res);
          this.getDataList()
        }
      })
      // this.setState({todoData})
    })
  }

  /**
   * 新增任务
   * @param {String} content 任务内容
   */
  async addToDo(content){
    // const { todoData } = this.state
    // const todoItem = {
    //   id: todoData[todoData.length - 1].id + 1,
    //   content,
    //   is_finish: 0
    // }
    // todoData.push(todoItem)
    // this.setState({ todoData, paddingAddedText: ''})

    const res = await addTodo({ content })
    console.log(res);
  }

  /**
   * 修改任务
   * @param {Number} id 
   * @param {String} content 
   */
  changeTodo(id, content){
    const { todoData } = this.state
    todoData.forEach(async (item, idx) => {
      if(item.id === id) {
        todoData[idx].content = content
        const res = await updateTodo({
          id: item.id,
          content: item.content
        })
        console.log(res);
        this.getDataList()
      }
    })
    // this.setState({todoData})
  }

  handleTextChange(e) {
    this.setState({
      paddingAddedText: e.nativeEvent.target.value
    })
  }

  async handleApply(){
    const { paddingAddedText } = this.state
    if(!paddingAddedText || !paddingAddedText.trim()) return
    await this.addToDo(paddingAddedText)

    // 清空数据
    this.setState({
      paddingAddedText: ''
    })
    // 清空dom展示
    document.getElementsByClassName('operation-input')[0].value = ''

    this.getDataList()
  }

  getDataList(keywords = '') {
    this.setState({ showLoading: true })
    // 防个抖
    if(this.state.debounceFlag) {
      clearTimeout(this.state.debounceFlag)
    }

    const timer = setTimeout(async () => {
      const res = await getTodosList({
        keywords // 搜索关键词
      })
      if(res.code === 200) {
        this.setState({showLoading: false, todoData: res.data})
      }
    }, 300);
    this.setState({debounceFlag: timer})
  }

  // 传给子组件的函数(闭包保留当前this)
  toChild(keywords){
    return (keywords) => {
      this.getDataList(keywords)
    }
  }

  componentDidMount(){
    this.getDataList()
  }

  render() {
    return (
      <div className="todos-wrap">
        <Header getDatas={this.toChild()}></Header>
        <div className="todos-body">
          { this.state.todoData.map(item => {
            return <ToDosItem key={item.id} data={item} parent={this}></ToDosItem>
          }) }
          <div className="loading-wrap" style={{display: this.state.showLoading ? 'block' : 'none'}}>
            <span className="loading">
              <svg viewBox="25 25 50 50" className="loading-svg">
                <circle cx="50" cy="50" r="20" fill="none"></circle>
              </svg>
            </span>
          </div>
        </div>
        <div className="todos-operation">
          <input className="operation-input" placeholder="在这里输入~~" onBlur={this.handleTextChange.bind(this)} />
          <div className="apply" onClick={this.handleApply.bind(this)}>提交</div>
        </div>
      </div>
    )
  }
}

export default ToDos
