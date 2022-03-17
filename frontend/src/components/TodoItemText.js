import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { editTodo } from "../features/todos/todoSlice";

const TodoText = ({ inputVisible, todo, setInputVisible, onCompleteClick }) => {
  const [textInput, setTextInput] = useState(todo.text);
  const dispatch = useDispatch();

  function onClickOutSide(e) {
    if (textInput && !textInput.contains(e.target)) {
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

  const editTextHandle = (e) => {
    setTextInput(e.target.value);
  };

  const submitEditTextHandler = (e) => {
    e.preventDefault();
    // setTextInput(e.target.value);
    console.log(textInput);

    dispatch(editTodo({id: todo._id, text: textInput}));
    setInputVisible(false);
  };
  return (
    <>
      {inputVisible ? (
        <form onSubmit={submitEditTextHandler}>
          <input
            value={textInput}
            onChange={editTextHandle}
            className="input-todo"
            autoFocus
          />
        </form>
      ) : (
        <span onClick={onCompleteClick} className="todo-item">
          {todo.text}
        </span>
      )}
    </>
  );
};

export default TodoText;
