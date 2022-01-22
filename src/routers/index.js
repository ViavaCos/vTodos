import React from 'react'
import { createHashHistory } from 'history'
import { Router, Route, Link } from 'react-router-dom'
import ToDos from '../views/todos/todos'

const history = createHashHistory()

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
        <Route path="/" componet={App}>a</Route>
        <Route path="/todos" component={Todos}>b</Route>
      </Router>
    )
  }
}

export default RouterConfig