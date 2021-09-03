import React, { useState, useEffect } from "react";
import EditTodo from "./EditTodo";

const ListTodo = () => {
  const [todos, setTodos] = useState([]);

  async function getTodos() {
    const response = await fetch("http://localhost:5000/todos");
    const todoArr = await response.json();

    return {
      todos: todoArr,
    };
  }

  useEffect(() => {
    // get todos on page render
    getTodos()
      .then((response) => {
        setTodos(response.todos);
      })
      .catch(() => {
        console.error("unable to fetch todos");
      });
  }, []);

  async function deleteTodo(id) {
    try {
      await fetch(`http://localhost:5000/todos/${id}`, {
        method: "DELETE",
      });
      // filter state to return all id's that doesn't equal id that was clicked
      setTodos(todos.filter((todo) => todo.todo_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  }

  console.log(todos); // check the response in the console

  return (
    <div className="my-3">
      <h1>List Todos</h1>

      <table className="table">
        <thead>
          <tr>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {todos.map((todo) => (
            <tr key={todo.todo_id}>
              <td>{todo.description}</td>
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
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListTodo;
