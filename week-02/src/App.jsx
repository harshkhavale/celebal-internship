import React, { useState, useEffect } from "react";
import ToDoList from "./components/ToDoList";
import AddToDo from "./components/mod/AddToDo";

function App() {
  const [toggle, setToggle] = useState(false);
  const [todos, setTodos] = useState([]);
  const [sortCriteria, setSortCriteria] = useState("date"); // default sorting by date
  const [filterCriteria, setFilterCriteria] = useState("all"); // default no filtering

  const changeToggle = () => {
    setToggle(!toggle);
  };

  useEffect(() => {
    const savedTasks = localStorage.getItem("todos");
    if (savedTasks) {
      setTodos(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const updateTodo = (id, updatedTodo) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, ...updatedTodo } : todo
    );
    setTodos(updatedTodos);
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const sortedTodos = todos.sort((a, b) => {
    if (sortCriteria === "date") {
      return new Date(b.id) - new Date(a.id);
    }
    if (sortCriteria === "alphabetical") {
      return a.text.localeCompare(b.text);
    }
    return 0;
  });

  const filteredTodos = sortedTodos.filter((todo) => {
    if (filterCriteria === "completed") {
      return todo.completed;
    }
    if (filterCriteria === "notCompleted") {
      return !todo.completed;
    }
    return true;
  });

  return (
    <div className="App text-sm md:text-base">
      {toggle && <AddToDo close={changeToggle} setTodos={setTodos} todos={todos} />}
      <div className="header flex justify-between items-center p-4">
        <div>
          <h1 className="font-bold text-2xl">To Do List</h1>
        </div>
        <div className="flex gap-4 items-center">
         
          <div className="filters">
            <select
              name="filter"
              id="filter"
              value={filterCriteria}
              onChange={(e) => setFilterCriteria(e.target.value)}
            >
              <option value="all">All</option>
              <option value="completed">Completed</option>
              <option value="notCompleted">Not Completed</option>
            </select>
          </div>
          <button className="border-2 rounded-xl bg-sky-500 text-white p-2" onClick={changeToggle}>
            Create Todo
          </button>
        </div>
      </div>
      <ToDoList todos={filteredTodos} updateTodo={updateTodo} deleteTodo={deleteTodo} />
    </div>
  );
}

export default App;
