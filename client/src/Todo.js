import React, { useContext } from "react";
import { useResource } from "react-request-hook";
import { StateContext } from "./Contexts";

export default function Todo({
  title,
  description,
  author,
  createdOn,
  complete,
  completedOn,
  id,
}) {
  const { dispatch } = useContext(StateContext);

  const [todos, createTodos] = useResource(
    ({
      todoTitle,
      todoDescription,
      author,
      createdOn,
      complete,
      completedOn,
    }) => ({
      url: "/todos",
      method: "get",
    })
  );

  const [todoUpdate, updateTodo] = useResource(
    ({ id, complete, completedOn }) => ({
      url: "/todos/",
      method: "put",
      data: {
        id,
        complete,
        completedOn,
      },
    })
  );

  function handleUpdate() {
    const completedOn = new Date().toLocaleString();
    updateTodo({
      id,
      complete: !complete,
      completedOn: complete ? null : completedOn,
    });
    dispatch({ type: "TOGGLE_TODO", id, complete: !complete, completedOn });
  }

  const [todoDelete, deleteTodo] = useResource(({ id }) => ({
    url: `/todos/${id}`,
    method: "delete",
  }));

  function handleDelete() {
    deleteTodo({
      id,
    });
    dispatch({ type: "DELETE_TODO", id });
  }

  return (
    <tr>
      <td>
        <div>
          <input
            type="checkbox"
            checked={complete || false}
            onChange={handleUpdate}
          />
          <label htmlFor="complete" className="form-label">
            &nbsp;&nbsp;&nbsp;complete
          </label>
        </div>
      </td>

      <td>{author}</td>
      <td>{title}</td>
      <td>{description}</td>
      <td>{createdOn}</td>
      <td>{completedOn}</td>
      <td>
        <button type="button" onClick={handleDelete}>
          Delete
        </button>
      </td>
    </tr>
  );
}
