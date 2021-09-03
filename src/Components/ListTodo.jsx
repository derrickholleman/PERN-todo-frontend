import React, { useState, useEffect } from "react";
import Todos from "./Todos";

const ListTodo = () => {
  const [todos, setTodos] = useState([]);

  function setTodosCallback(data) {
    // callback function so you don't pass useState directly as props
    setTodos(data)
  }

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
