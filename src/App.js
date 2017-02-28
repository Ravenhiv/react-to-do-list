import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {TodoForm, TodoList, Footer} from './components/todo';
import {addTodo, generateId, findById, toggleTodo, updateTodo, removeTodo} from './libs/todoHelpers';
import {pipe, partial} from './libs/utils';

class App extends Component {

  state = {
    todos: [
      { id: 1, name: 'Learn JSX', isComplete: true },
      { id: 2, name: 'Build an Awesome App', isComplete: false },
      { id: 3, name: 'Ship It!', isComplete: false }
    ],
    currentTodo: ''
  }

  handleRemove = (id, event) => {
    event.preventDefault();
    const updatedTodos = removeTodo(this.state.todos, id);
    this.setState({
      todos: updatedTodos
    });
  }

  handleToggle = (id) => {
    const getUpdatedTodos = pipe(findById, toggleTodo,
      partial(updateTodo, this.state.todos));
    const updatedTodos = getUpdatedTodos(id, this.state.todos);
    this.setState({todos: updatedTodos});
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const newId = generateId();
    const newTodo = {id: newId, name: this.state.currentTodo, isComplete: false};
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
        <TodoList
          handleToggle={this.handleToggle}
          todos={this.state.todos}
          handleRemove={this.handleRemove}
        />
        <Footer/>
        </div>
      </div>
    );
  }
}

export default App;
