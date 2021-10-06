import { useEffect, useRef, useState } from "react";
import axios from "axios";
import * as Icon from "react-feather";

import "./App.css";
import {
  editTodo,
  getMostProductiveDays,
  removeTodoAPI,
  taskCompleted,
} from "./api/todoAPI";
import ProductiveDay from "./components/ProductiveDay";
import Analytics from "./components/Analytics/Analytics";

const App = () => {
  const url = "http://localhost:80";

  const [task, setTask] = useState([]);
  const [addTask, setAddTask] = useState("");
  const [view, setView] = useState(1);
  const [mode, setMode] = useState(false);
  const [todoId, settodoId] = useState(null);
  const [prodDate, setprodDate] = useState([]);
  const textInput = useRef(null);

  const getAllTodo = async () => {
    axios
      .get(`${url}/api/todo/get-todos`)
      .then(async (res) => {
        const { result } = res.data;
        if (view === 1) setTask(result);
        else if (view === 3) {
          const data = result.filter((todo) => {
            return todo.status === "completed";
          });
          setTask(data);
        } else if (view === 2) {
          const data = result.filter((todo) => {
            return todo.status === "Incomplate";
          });
          setTask(data);
        } else {
          const data = await getMostProductiveDays();
          console.log(data);
          setprodDate(data.result);
        }
      })
      .catch((err) => {
        console.log(err, err.response);
      });
  };

  useEffect(() => {
    getAllTodo();
  }, [view]);

  const addTaskHandler = async (e) => {
    if (e.which === 13 && addTask.length > 0) {
      if (mode !== true) {
        axios
          .post(`${url}/api/todo/create-todo`, {
            name: addTask,
          })
          .then((res) => {
            // const { result } = res.data;
            getAllTodo();
            setAddTask("");
          })
          .catch((err) => {
            console.log(err, err.response);
          });
      } else {
        const data = await editTodo(todoId, { name: addTask });
        settodoId(null);
        setMode(false);
        getAllTodo();
      }
    } else if (e.which === 13) {
      alert("Please enter new task");
    }
  };

  const onRemoveTodo = async (id) => {
    try {
      const data = await removeTodoAPI(id);
      getAllTodo();
    } catch (err) { }
  };

  const onUpdateTodo = async (task) => {
    textInput.current.focus();
    setAddTask(task.name);
    setMode(true);
    settodoId(task.id);
  };

  const onCompletedTodo = async (id, e) => {
    try {
      const data = {
        isChecked: e.target.checked,
      };
      const result = await taskCompleted(id, data);
      getAllTodo();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="App">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="card card-white">
              <div className="card-body">
                <form onSubmit={(e) => e.preventDefault()}>
                  <input
                    type="text"
                    className="form-control add-task"
                    placeholder="New Task..."
                    value={addTask}
                    ref={textInput}
                    onChange={(e) => setAddTask(e.target.value)}
                    onKeyPress={(e) => addTaskHandler(e)}
                  />
                </form>
                <ul className="nav nav-pills todo-nav">
                  <li role="presentation" className="nav-item all-task active">
                    <button className="nav-link" onClick={() => setView(1)}>
                      All
                    </button>
                  </li>
                  <li role="presentation" className="nav-item active-task">
                    <button className="nav-link" onClick={() => setView(2)}>
                      Active
                    </button>
                  </li>
                  <li role="presentation" className="nav-item completed-task">
                    <button className="nav-link" onClick={() => setView(3)}>
                      Completed
                    </button>
                  </li>
                  <li role="presentation" className="nav-item completed-task">
                    <button className="nav-link" onClick={() => setView(4)}>
                      Most Productive Days
                    </button>
                  </li>
                  <li role="presentation" className="nav-item completed-task">
                    <button className="nav-link" onClick={() => setView(5)}>
                      Analytics
                    </button>
                  </li>
                </ul>
                {view === 4 ? (
                  <ProductiveDay task={prodDate} />
                ) : view === 5 ? (
                  <Analytics />
                ) : (
                  <div className="todo-list">
                    {task.map((task) => {
                      return (
                        <div className="todo-item" key={task.id}>
                          <div className="checker">
                            <span className="">
                              <input
                                type="checkbox"
                                defaultChecked={
                                  task.status === "completed" ? true : false
                                }
                                onChange={(e) => {
                                  onCompletedTodo(task.id, e);
                                  const taskData = document.getElementById(
                                    `chk${task.id}`
                                  );
                                  if (e.target.checked) {
                                    taskData.innerHTML = `<s className="text-muted">${task.name}</s>`;
                                  }
                                }}
                              />
                            </span>
                          </div>{" "}
                          <span id={`chk${task.id}`}>
                            {task.status === "completed" ? (
                              <s className="text-muted">{task.name}</s>
                            ) : (
                              task.name
                            )}
                          </span>
                          <Icon.Trash
                            color="red"
                            size={22}
                            onClick={() => onRemoveTodo(task.id)}
                          />
                          <Icon.Edit
                            color="orange"
                            size={22}
                            onClick={() => onUpdateTodo(task)}
                          />
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
