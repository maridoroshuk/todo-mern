import React from "react";
import { useDispatch } from 'react-redux';
import {deleteTodo } from '../features/todos/todoSlice'

const TodoItem = ({todo}) => {
  const dispatch = useDispatch()

  const deleteHandler = () => {
    dispatch(deleteTodo(todo._id))
  }
  return (
    <div id="todos" class="todos">
      <li className={todo.completed ? "completed" : "uncompleted"}>
        <button className="complete-btn">
        <i className="fas fa-check"></i>
        </button>
        <span className="todo-item">{todo.text}</span>
        <button  className="edit-btn">
          <i className="fas fa-pencil-alt"></i>
        </button>
        <button  onClick={deleteHandler} className="destroy-btn">
          <i className="fas fa-times"></i>
        </button>
      </li>
    </div>
  );
};

export default TodoItem;
