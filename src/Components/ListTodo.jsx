import React, { useState, useEffect } from "react";
import Todos from './Todos'

const ListTodo = () => {
  const [todos, setTodos] = useState([]);

  async function getTodos() {
    const response = await fetch("http://localhost:5000/todos");
    const todoArr = await response.json();

    setTodos(todoArr);
    console.log(todoArr); /// check the response in the console
  }

  useEffect(() => {
    // get todos on page render
    getTodos();
  }, []);

  return (
    <div className="my-3">
      <h1>List Todos</h1>

      <table class="table">
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
              todo={todo}/>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListTodo;
