import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {TodoForm, TodoList} from './components/todo';
import {addTodo, generateId} from './libs/todoHelpers';

class App extends Component {

  state = {
    todos: [
      { id: 1, name: 'Learn JSX', isCompleted: true },
      { id: 2, name: 'Build an Awesome App', isCompleted: false },
      { id: 3, name: 'Ship It!', isCompleted: false }
    ],
    currentTodo: ''
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const newId = generateId();
    const newTodo = {id: newId, name: this.state.currentTodo, isCompleted: false};
    const updatedTodos = addTodo(this.state.todos, newTodo);
    this.setState({
      currentTodo: '',
      todos: updatedTodos,
      errorMessage: ''
    });
  }

  handleEmptySubmit = (event) => {
    event.preventDefault();
    this.setState({
      errorMessage: 'Please supply a todo name'
    });
  }

  handleInputChange = (event) => {
    this.setState({
      currentTodo: event.target.value
    })
  }

  render() {
    const submitHandler = this.state.currentTodo ?
                          this.handleSubmit : this.handleEmptySubmit;
    return (
      <div className="app">
        <div className="app-header">
          <img src={logo} className="app-logo" alt="logo" />
          <h2>React Todos</h2>
        </div>
        <div className="todo-app">
          {
            // if have errorMessage then show div
            this.state.errorMessage &&
            <span className="error">
              {this.state.errorMessage}
            </span>
          }
          <TodoForm
            currentTodo={this.state.currentTodo}
            handleInputChange={this.handleInputChange}
            handleSubmit={submitHandler}
          />
        <TodoList todos={this.state.todos} />
        </div>
      </div>
    );
  }
}

export default App;
