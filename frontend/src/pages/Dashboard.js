import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../components/Spinner";
import TodoItem from "../components/TodoItem";
import Form from "../components/Form";
import { getTodo, reset } from "../features/todos/todoSlice";

function Dashboard() {
  const dispatch = useDispatch();

  const { todoList , isLoading, isError, message } = useSelector(
    (state) => state.todos
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    dispatch(getTodo());

    return () => {
      dispatch(reset());
    };
  }, [isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Form />

      <section className="content">
        {todoList.length > 0 ? (
          <div className="goals">
            {todoList.map((todo) => (
              <TodoItem key={todo._id} todo={todo} />
            ))}
            <div className="filter-todo">
        <p id="filter-todo-all">all</p>
        <p id="filter-todo-completed">completed</p>
        <p id="filter-todo-uncompleted">uncompleted</p>
      </div>
          </div>
        ) : (
          <h3>You have not set any todo</h3>
        )}
      </section>
    </>
  );
}

export default Dashboard;
