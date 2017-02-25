import React from 'react';

export const TodoItem = (props) => (
  <li>
    <input type="checkbox" defaultChecked={props.isCompleted} />
    {props.name}
  </li>
)
