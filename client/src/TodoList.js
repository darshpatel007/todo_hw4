import React, { useContext } from "react";
import { StateContext } from "./Contexts";
import Todo from "./Todo";

export default function TodoList() {
  const { state } = useContext(StateContext);
  const t_todos = state.todos;
  const todos = t_todos.reverse();
  return (
    <div className="container">
      <h1>ToDo List</h1>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Status</th>
            <th scope="col">Author</th>
            <th scope="col">ToDo Title</th>
            <th scope="col">Description</th>
            <th scope="col">Date Created</th>
            <th scope="col">Date Completed</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((p, i) => (
            <Todo {...p} key={"post-" + i} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
