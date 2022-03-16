import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTodo, toggleTodo, editTodo } from "../features/todos/todoSlice";

const TodoItem = ({ todo }) => {
  const inputRef = useRef(null);
  const [inputVisible, setInputVisible] = useState(false);
  const [textInput, setTextInput] = useState(todo.text);
  const dispatch = useDispatch();
  console.log(inputVisible);
  const completeHandler = () => {
    dispatch(toggleTodo(todo._id));
  };

  const deleteHandler = () => {
    dispatch(deleteTodo(todo._id));
  };

  const editTodoHandler = () => {
    setInputVisible((prev) => ({
      ...prev,
      inputVisible: true,
    }));
    dispatch(editTodo({ id: todo._id, text: textInput }));
  };

  function onClickOutSide(e) {
    if (inputRef.current && !inputRef.current.contains(e.target)) {
      setInputVisible(false); // Disable text input
    }
  }

  useEffect(() => {
    // Handle outside clicks
    if (inputVisible) {
      document.addEventListener("mousedown", onClickOutSide);
    }

    return () => {
      document.removeEventListener("mousedown", onClickOutSide);
    };
  });

  return (
    <div id="todos" className="todos">
      <li className={todo.complete ? "completed" : "uncompleted"}>
        <button className="complete-btn">
          <i className="fas fa-check"></i>
        </button>
        {inputVisible && (
          <input
            autoFocus
            className="input-todo"
            ref={inputRef}
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
          />
        )}
        {!inputVisible && (
          <>
            <span onClick={completeHandler} className="todo-item">
              {textInput}
            </span>
            <button onClick={editTodoHandler} className="edit-btn">
              <i className="fas fa-pencil-alt"></i>
            </button>
          </>
        )}
        <button onClick={deleteHandler} className="destroy-btn">
          <i className="fas fa-times"></i>
        </button>
      </li>
    </div>
  );
};

export default TodoItem;
