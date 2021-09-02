import React, { useState } from "react";

const InputTodo = () => {
  const [description, setDescription] = useState("");

  const submitForm = async e => {
      // e.preventDefault();  prevent refresh on submit

      try {
          const body = {description}
          await fetch('http://localhost:5000/todos', {
              method: 'POST',
              headers: { 'Content-type': 'application/json'},
              body: JSON.stringify(body)
          })

      } catch (err) {
          console.error(err.message)
      }
  }

  return (
    <div>
      <h1 className="my-3">Input Todo</h1>

      <form className="d-flex" onSubmit={submitForm}>
        <input
          type="text"
          placeholder="add todo"
          className="form-control"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button className="btn btn-success" disabled={description.length === 0}>ADD</button>
      </form>
    </div>
  );
};

export default InputTodo;
