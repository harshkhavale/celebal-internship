import React, { useState } from "react";
import { MdOutlineEdit } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";
import {
  IoCheckmarkCircleOutline,
  IoCheckmarkCircleSharp,
} from "react-icons/io5";

const ToDoItem = ({ todo, updateTodo, deleteTodo }) => {
  const [mark, setMark] = useState(todo.completed);
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(todo.text);

  const handleClick = () => {
    const updatedTodo = { ...todo, completed: !mark };
    updateTodo(todo.id, updatedTodo);
    setMark(!mark);
  };

  const handleDelete = () => {
    deleteTodo(todo.id);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    const updatedTodo = { ...todo, text: editedText };
    updateTodo(todo.id, updatedTodo);
    setIsEditing(false);
  };

  return (
    <div className="todo flex items-end gap-4 justify-between border p-4 shadow-sm">
      <div className="title">
        {isEditing ? (
          <input
            type="text"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            className="border outline-sky-500 p-2"
          />
        ) : (
          <p>{todo.text}</p>
        )}
      </div>
      <div className="flex gap-2 items-center">
        <div className="edit">
          {isEditing ? (
            <button
              onClick={handleSaveClick}
              className="bg-sky-500 text-white rounded-2xl p-2"
            >
              Save
            </button>
          ) : (
            <MdOutlineEdit
              className="cursor-pointer text-2xl"
              onClick={handleEditClick}
            />
          )}
        </div>
        <div className="delete">
          <AiOutlineDelete
            className="text-red-500 cursor-pointer text-2xl"
            onClick={handleDelete}
          />
        </div>
        <div className="mark">
          {!mark ? (
            <IoCheckmarkCircleOutline
              className="text-green-500 cursor-pointer text-2xl"
              onClick={handleClick}
            />
          ) : (
            <IoCheckmarkCircleSharp
              className="cursor-pointer text-green-500 text-2xl"
              onClick={handleClick}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ToDoItem;
