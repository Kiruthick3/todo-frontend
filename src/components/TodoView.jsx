import React, { useEffect, useState } from "react";
import * as TodoController from "../controllers/TodoController";
import { handleLogout } from "../controllers/AuthController";
import  "../styles/Todo.css"
import { useNavigate } from "react-router-dom";
import { MdDeleteOutline } from "react-icons/md";
import { FaDeleteLeft } from "react-icons/fa6";
import { AiOutlineEnter } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { TiTick } from "react-icons/ti";
import { IoIosLogOut } from "react-icons/io";

const TodoView = ({user,setUser}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editID, setEditId] = useState(-1);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const logout = () => handleLogout(setTodos,setUser,navigate);

  useEffect(() => {
    if(user){
      setTodos([]);
      loadTodos();
    }   
  }, [user]);

  const loadTodos = async () => {
    setLoading(true);
    try {
      const data = await TodoController.fetchTodos();
      // console.log("Fetched todos:", data); 
    
      if(Array.isArray(data)){
        setTodos(data);
      }else{
        // console.error("Unexpected response format:", data);
        throw new Error("Unexpected API response format.");
      }

    } catch (err) {
      setError("Unable to load task");
      // console.error("Error loading todos:", err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (title.trim() && description.trim()) {
      try {
        await TodoController.createTodo(title, description);
        setTitle("");
        setDescription("");
        loadTodos();
      } catch (err) {
        setError("Unable to create task");
        // console.error("Error creating todo:", err);
      }
    }
  };

  const handleEdit = (item) => {
    setIsModalOpen(true);
    setEditId(item._id);
    setEditTitle(item.title);
    setEditDescription(item.description);
  };

  const handleUpdate = async () => {
    try {
      await TodoController.editTodo(editID, editTitle, editDescription);
      setIsModalOpen(false);
      setEditId(-1);
      setEditTitle("");
      setEditDescription("");
      loadTodos();
    } catch (err) {
      setError("Unable to update Todo item");
      // console.error("Error updating todo:", err);
    }
  };

  const handleRemove = async (id) => {
    try {
      await TodoController.removeTodo(id);
      loadTodos();
    } catch (err) {
        setError("Unable to remove Todo item");
      // console.error("Error deleting todo:", err);
    }
  };

  const handleDeleteAll = async () => {
    try {
      await TodoController.removeAllTodos();
      loadTodos();
    } catch (err) {
        setError("Unable to delete all Todo item");
      // console.error("Error deleting all todos:", err);
    }
  };

  return (
    <>
      <header>
        <div className="title">
          <h1>TODO</h1>
        </div>
        <div className="info">
          <p>Welcome, <span className="user_info">{user}</span> </p>
          <button className="white_btn" onClick={logout}><IoIosLogOut /></button>
        </div>
      </header>
      <div className="container">
        <div className="form-group">
          <input
            type="text"
            placeholder="Title"
            className="primary-textInput"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <input
            type="text"
            placeholder="Description"
            className="primary-textInput"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          />
        </div>
        <div className="primary-btn">
          <button className="btn-submit" onClick={handleSubmit}>
            <AiOutlineEnter />
          </button>
          <button className="btn-delete" onClick={handleDeleteAll}>
            <MdDeleteOutline /> Delete All
          </button>
        </div>

        <ul>
          {todos.map((item) => (
            <li key={item._id}>
              <div className="list-area">
                <input type="checkbox" id={`check-box${item._id}`} />
                <label htmlFor={`check-box${item._id}`}>
                  <span className="overflow-span">{item.title}</span>
                  <span className="overflow-span">{item.description}</span>
                </label>
                <div className="task-btn">
                  <button className="btn-edit" onClick={() => handleEdit(item)}>
                    <FaRegEdit />
                  </button>
                  <button className="btn-remove" onClick={() => handleRemove(item._id)}>
                    <FaDeleteLeft />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        {error && <p className="error">{error}</p>}
        {todos.length === 0 && <p className="message">ADD NEW TODOS</p>}
        {loading && <p className="message">Loading...</p>}

        {isModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <span className="ok" onClick={handleUpdate}>
                <TiTick />
              </span>
              <h3>Edit Todo</h3>
              <span className="close" onClick={() => setIsModalOpen(false)}>
                <IoClose />
              </span>
              <div>
                <input
                  type="text"
                  placeholder="Title"
                  className='secondary-textInput'
                  onChange={(e) => setEditTitle(e.target.value)}
                  value={editTitle}
                  onKeyDown={(e) => e.key === "Enter" && handleUpdate()}
                />
                <input
                  type="text"
                  placeholder="Description"
                  className='secondary-textInput'
                  onChange={(e) => setEditDescription(e.target.value)}
                  value={editDescription}
                  onKeyDown={(e) => e.key === "Enter" && handleUpdate()}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default TodoView;
