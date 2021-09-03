import React, { Fragment } from "react";
import EditTodo from "./EditTodo";

const Todos = ({ todo, setTodos, allTodos }) => {

  async function deleteTodo(id) {
    try {
      await fetch(`http://localhost:5000/todos/${id}`, {
        method: "DELETE",
      });
      // filter state to return all id's that don't equal the id that was clicked
      setTodos(allTodos.filter((todo) => todo.todo_id !== id))
    } catch (err) {
      console.error(err.message);
    }
  }

  return (
    <Fragment>
      <tr>
        <td>{todo.description}</td>
        <td>{todo.importance}</td>
        <td>
          <EditTodo todo={todo} />
        </td>
        <td>
          <button
            className="btn btn-danger"
            onClick={() => deleteTodo(todo.todo_id)}
          >
            DELETE
          </button>
        </td>
      </tr>
    </Fragment>
  );
};

export default Todos;
