import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTodo, toggleTodo, editTodo } from "../features/todos/todoSlice";
import TodoText from "./TodoItemText";

const TodoItem = ({ todo }) => {
  const [inputVisible, setInputVisible] = useState(false);

  const dispatch = useDispatch();

  const completeHandler = () => {
    dispatch(toggleTodo(todo._id));
  };

  const deleteHandler = () => {
    dispatch(deleteTodo(todo._id));
  };

  return (
    <div id="todos" className="todos">
      <li className={todo.complete ? "completed" : "uncompleted"}>
        <button className="complete-btn">
          <i className="fas fa-check"></i>
        </button>
        <TodoText
          onCompleteClick={completeHandler}
          inputVisible={inputVisible}
          todo={todo}
          setInputVisible={setInputVisible}
        />
        <button onClick={() => setInputVisible(true)} className="edit-btn">
          <i className="fas fa-pencil-alt"></i>
        </button>
        <button onClick={deleteHandler} className="destroy-btn">
          <i className="fas fa-times"></i>
        </button>
      </li>
    </div>
  );
};

export default TodoItem;
