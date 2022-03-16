import { useState } from "react";
import { useDispatch } from "react-redux";
import { createTodo } from "../features/todos/todoSlice";

function Form() {
  const [text, setText] = useState("");

  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(createTodo({ text: text, completed: false }));
    setText("");
  };

  return (
    <form id="form" htmlFor="" onSubmit={onSubmit}>
      <input
        onChange={(e) => setText(e.target.value)}
        value={text}
        id="input"
        className="input"
        placeholder="What needs to be done?"
        type="text"
      />
    </form>
  );
}

export default Form;
