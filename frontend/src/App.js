import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TodoList from "./components/TodoList";

function App() {

  return (
    <>
      <Router>
        <div className="App">
          <header>
            <h1>my todo list</h1>
          </header>
          <div className="container">
            <Routes>
              <Route path="/" element={<TodoList />} />
            </Routes>
          </div>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
