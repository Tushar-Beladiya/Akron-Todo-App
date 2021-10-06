import React from "react";

const ProductiveDay = ({ task }) => {
  console.log("task===", task);
  return (
    <>
      <div className="todo-list">
        {task.map((task) => {
          return (
            <div className="todo-item" key={task.id}>
              <span className="btn btn-primary">{task.date}</span>&nbsp;&nbsp;
              <span className="bg-warning p-2 mr-2 rounded-pill">
                {" "}
                {task.Total}
              </span>
              Task has been completed.
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ProductiveDay;
