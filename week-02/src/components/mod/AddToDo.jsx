import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";

const AddToDo = ({ close, setTodos, todos }) => {
  const [todo, setTodo] = useState("");
  const [valid, setValid] = useState(true);
  const addTodoItem = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    if (todo.length <= 0) {
      setValid(false);
      return;
    }
    if (todo.trim() === "") return;
    const newTodo = {
      id: Date.now(),
      text: todo.trim(),
      completed: false,
    };
    setTodos([...todos, newTodo]);
    setTodo("");
    setValid(true);
    close(); // Optionally close the modal after adding the todo
  };

  return (
    <div className="create fixed bg-black/50 inset-0 flex items-center justify-center h-screen">
      <div className="modal relative bg-white p-20">
        <h1>Create To-Do</h1>
        <div className="flex item-center mt-4 ">
          <div className="absolute top-0 right-0 p-2" onClick={close}>
            <IoMdClose className="text-2xl cursor-pointer" />
          </div>
          <form onSubmit={addTodoItem} className="flex flex-col gap-4">
            <div className="flex flex-col">
              <input
                type="text"
                name="title"
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
                placeholder="To do title"
                className="border outline-sky-500 p-2"
              />
            </div>
            {!valid && <p className="text-sm text-red-500">title required!</p>}
            <div>
              <button
                type="submit"
                className="bg-sky-500 w-full text-white rounded-2xl p-2"
              >
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddToDo;
