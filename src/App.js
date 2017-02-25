import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {TodoForm, TodoList} from './components/todo';

class App extends Component {

  constructor() {
    super();
    this.state = {
      todos: [
        { id: 1, name: 'Learn JSX', isCompleted: true },
        { id: 2, name: 'Build an Awesome App', isCompleted: false },
        { id: 3, name: 'Ship It!', isCompleted: false }
      ],
      currentTodo: ''
    }

    this._handleInputChange = this._handleInputChange.bind(this);
  }

  _handleInputChange(event) {
    this.setState({
      currentTodo: event.target.value
    })
  }

  render() {
    return (
      <div className="app">
        <div className="app-header">
          <img src={logo} className="app-logo" alt="logo" />
          <h2>React Todos</h2>
        </div>
        <div className="todo-app">
          <TodoForm
            currentTodo={this.state.currentTodo}
            handleInputChange={this._handleInputChange}
          />
        <TodoList todos={this.state.todos} />
        </div>
      </div>
    );
  }
}

export default App;
