import React from 'react';
import { TodoItem } from './TodoItem';

export const TodoList = (props) => (
  <div className="todo-list">
    <ul>
      {props.todos.map(todo =>
        <TodoItem
          key={todo.id}
          isCompleted={todo.isCompleted}
          name={todo.name}
        />
      )}
    </ul>
  </div>
)
