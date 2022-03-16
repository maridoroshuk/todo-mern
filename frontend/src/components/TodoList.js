import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../components/Spinner";
import TodoItem from "../components/TodoItem";
import Form from "../components/Form";
import {
  getTodo,
  reset,
  setFilteredTodoList,
} from "../features/todos/todoSlice";

function TodoList() {
  const dispatch = useDispatch();

  const { todoList, isLoading, isError, message } = useSelector(
    (state) => state.todos
  );

  useEffect(() => {
    dispatch(getTodo());
    if (isError) {
      console.log(message);
    }
    return () => {
      dispatch(reset());
    };
  }, [isError, message, dispatch]);

  const statusHandler = (e) => {
    const status = e.target.innerText;
    dispatch(setFilteredTodoList(status));
  };

  return (
    <>
      <Form />
      {isLoading ? (
        <Spinner />
      ) : (
        <section className="content">
          {todoList.length > 0 ? (
            <div className="goals">
              {todoList.map((todo) => (
                <TodoItem key={todo._id} todo={todo} />
              ))}
              <div className="filter-todo">
                <p onClick={statusHandler} id="filter-todo-all">
                  all
                </p>
                <p onClick={statusHandler} id="filter-todo-completed">
                  completed
                </p>
                <p onClick={statusHandler} id="filter-todo-uncompleted">
                  uncompleted
                </p>
              </div>
            </div>
          ) : (
            <h3 className="empty-todo">You have not set any todo</h3>
          )}
        </section>
      )}
    </>
  );
}

export default TodoList;
