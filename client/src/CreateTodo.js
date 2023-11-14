import React, { useState, useContext, useEffect } from "react";
import { useResource } from "react-request-hook";
import { StateContext } from "./Contexts";

export default function CreateTodo() {
  const { state, dispatch } = useContext(StateContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const todos = state.todos;

  const [post, createPost] = useResource(
    ({ title, description, author, createdOn, complete, completedOn }) => ({
      url: "/todos",
      method: "post",
      data: {
        title: title,
        description: description,
        author: author,
        createdOn: createdOn,
        complete: complete,
        completedOn: completedOn,
      },
    })
  );

  function handleTodoSubmit(e) {
    e.preventDefault();
    if (title.length === 0) {
      alert("Please enter todo name.");
      return;
    }

    let createdOn = new Date().toLocaleString();
    let completedOn = null;
    let complete = false;
    let author = state.user;
    // "id": 3,
    //   "title": "Go to Six Flags",
    //   "description": "Amazing...",
    //   "dateCreated": "11/01/2023 12:01:12 P.M.",
    //   "complete": false,
    //   "dateCompleted": null,
    //   "author": "Unknown"

    createPost({
      title,
      description,
      author,
      createdOn,
      complete,
      completedOn,
    });
    dispatch({
      type: "CREATE_TODO",
      title,
      description,
      author,
      createdOn,
      complete,
      completedOn,
    });

    setTitle("");
    setDescription("");

    console.log(state.todos);
  }

  function handleChangeTodoTitle(e) {
    setTitle(e.target.value);
  }

  function handleChangeTodoDescription(e) {
    setDescription(e.target.value);
  }

  return (
    <div className="container">
      <h1>Add ToDo</h1>

      <div className="row">
        <form onSubmit={handleTodoSubmit}>
          <div className="col-md-3">
            <div className="mb-3">
              <label className="form-label">Todo Name</label>
              <input
                type="text"
                name="create-title"
                id="create-title"
                value={title}
                onChange={handleChangeTodoTitle}
                className="form-control"
              />
            </div>
          </div>

          <div className="col-md-3">
            <div className="mb-3">
              <label htmlFor="create-description">Description:</label>
              <textarea
                type="text"
                name="create-description"
                id="create-description"
                value={description}
                onChange={handleChangeTodoDescription}
                className="form-control"
              />
            </div>
          </div>
          <div className="col-md-3">
            <div className="mb-3">
              <input type="submit" value="Create" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
