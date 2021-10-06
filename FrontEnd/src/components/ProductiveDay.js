import React from "react";

const ProductiveDay = ({ task }) => {
  console.log("task===", task);
  return (
    <>
      <div className="todo-list">
        {task.map((task,key) => {
          console.log(task.id);
          return (
            <div className="todo-item" key={key}>
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
