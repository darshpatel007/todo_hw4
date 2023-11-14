function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
    case "REGISTER":
      return action.username;
    case "LOGOUT":
      return "";
    default:
      return state;
  }
}

function todosReducer(state, action) {
  const todos = state;
  switch (action.type) {
    case "FETCH_TODOS":
      return action.todos;
    case "CREATE_TODO":
      const newTodo = {
        title: action.title,
        description: action.description,
        createdOn: action.createdOn,
        complete: action.complete,
        completedOn: action.completedOn,
        author: action.author,
      };
      return [newTodo, ...state];
    case "TOGGLE_TODO":
      let updatedTodos = [];
      todos.forEach((todo) => {
        if (action.id === todo.id) {
          updatedTodos.push({
            ...todo,
            complete: action.complete,
            completedOn: action.complete ? new Date().toLocaleString() : null,
          });
        } else {
          updatedTodos.push(todo);
        }
      });
      return updatedTodos;
    case "DELETE_TODO":
      return todos.filter((todo) => todo.id !== action.id);

    default:
      return state;
  }
}

export default function appReducer(state, action) {
  return {
    user: userReducer(state.user, action),
    todos: todosReducer(state.todos, action),
  };
}
