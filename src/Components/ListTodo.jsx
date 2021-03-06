import React, { useState, useEffect } from "react";
import Todos from "./Todos";

const ListTodo = () => {
  const [todos, setTodos] = useState([]);

  // callback function so you don't pass useState directly as props
  function setTodosCallback(data) {
    setTodos(data)
  }

  async function getTodos() {
    const todoResponse = await fetch("http://localhost:5000/todos");
    const todoJSON = await todoResponse.json();

    return {
      todos: todoJSON,
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

  console.log(todos); // check the response in the console

  return (
    <div className="my-3">
      <h1>List Todos</h1>

      <table className="table">
        <thead>
          <tr>
            <th>Description</th>
            <th>Importance Level</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {todos.map((todo) => (
            <Todos 
            key={todo.todo_id}
            todo={todo}
            // passing state and whole todos array to child component
            setTodos={setTodosCallback}
            allTodos={todos}/>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListTodo;
