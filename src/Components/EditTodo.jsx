import React, { Fragment, useState } from "react";

const EditTodo = ({ todo }) => {
  const [description, setDescription] = useState(todo.description);
  const [importance, setImportance] = useState(todo.importance);

  const resetValues = () => {
    setDescription(todo.description)
    setImportance(todo.importance)
  }

  const editText = async (id) => {
    try {
      const body = { description, importance };

      await fetch(`http://localhost:5000/todos/${id}`, {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(body),
      });

      // force refreshes the page after edit
      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <button
        type="button"
        className="btn btn-warning"
        data-toggle="modal"
        data-target={`#id${todo.todo_id}`}
      >
        Edit
      </button>

      <div className="modal" id={`id${todo.todo_id}`}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Edit Todo</h4>
              <button type="button" className="close" data-dismiss="modal" onClick={() => resetValues()}>
                &times;
              </button>
            </div>

            <div className="modal-body">
              <input
                type="text"
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <input
                type="number"
                min="1" 
                max="10"
                className="form-control"
                // parseint needed to display because it's stored as a CHAR in the Database
                value={parseInt(importance) || ''}
                onChange={(e) => setImportance(e.target.value)}
              />
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                data-dismiss="modal"
                onClick={() => editText(todo.todo_id)}
              >
                Save Edit
              </button>
              <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={() => resetValues()}>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default EditTodo;
