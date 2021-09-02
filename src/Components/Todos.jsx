import React, { Fragment } from "react";

const Todos = ({ todo }) => {
  return (
    <Fragment>
      <tr>
        <td>{todo.description}</td>
        <td>Edit</td>
        <td>Delete</td>
      </tr>
    </Fragment>
  );
};

export default Todos;
