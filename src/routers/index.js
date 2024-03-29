import React from 'react'
import { createHashHistory } from 'history'
import { Router, Route, Link } from 'react-router-dom'
import ToDos from '../views/todos/todos'

const baseRouterUrl = window.__POWERED_BY_QIANKUN__ ? '/subapp/vtodos' : ''
const history = createHashHistory({
  basename: baseRouterUrl
})

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>App</h1>
        <ul>
          <li><Link to="/todos">Todos</Link></li>
        </ul>
      </div>
    )
  }
}

class Todos extends React.Component {
  render() {
    return (
      <ToDos></ToDos>
    )
  }
}

class RouterConfig extends React.Component {
  render() {
    return (
      <Router history={history}>
        <Route path="/" componet={App}></Route>
        <Route path="/todos" component={Todos}></Route>
      </Router>
    )
  }
}

export default RouterConfig