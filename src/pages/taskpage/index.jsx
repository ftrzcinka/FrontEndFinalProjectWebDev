import React, { useEffect, useState } from "react";
import Styles from "./styles.module.css";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import TaskAPI from "./api";
import TaskCard from "../../components/TaskCard";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
import Background from "../../images/background.png";

function Taskpage() {
  const [taskDescription, setTaskDescription] = useState("");
  const [taskPriority, setTaskPriority] = useState();
  const [taskCompleted, setTaskCompleted] = useState(false);
  const [taskEmployeeId, setTaskEmployeeId] = useState();
  const [tasks, setTasks] = useState([]);
  const [modal, setModal] = useState(false);

  const getSingleTask = async (id) => {
    const foundTask = await TaskAPI.getSingleTask(id);
    setTask(foundTask);
  };

  const navigate = useNavigate();

  const handleGoTaskPage = (id) => {
    navigate(`/FrontEndFinalProjectWebDev/task/${id}`);
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  const refreshTasks = async () => {
    const allTasks = await TaskAPI.getAllTasks();
    setTasks(allTasks);
  };

  useEffect(() => {
    refreshTasks();
  }, []);

  return (
    <div>
      <Navbar />
      
      <img className={Styles.background_img} src={Background} /> 
      <div className={Styles.miniHeaderButtons}>
        <button className={Styles.taskButton} onClick={toggleModal}>Create New Task</button>
        {modal && (
          <div className={Styles.createEmployeeModal}>
            <div>
              <header>
                <h2>Add a New Employee!</h2>
              </header>
              <body>
                <form>
                  <TextField className={Styles.formModal}
                    label="Description"
                    variant="outlined"
                    onChange={(event) => setTaskDescription(event.target.value)}
                  />
                  <br></br>
                  <TextField className={Styles.formModal}
                    label="Priority"
                    variant="outlined"
                    onChange={(event) => setTaskPriority(event.target.value)}
                  />
                  <br></br>
                  <TextField className={Styles.formModal}
                    label="Completed"
                    variant="outlined"
                    onChange={(event) => setTaskCompleted(event.target.value)}
                  />
                  <br></br>
                  <TextField className={Styles.formModal}
                    label="Employee ID"
                    variant="outlined"
                    onChange={(event) => setTaskEmployeeId(event.target.value)}
                  />
                  <br></br>
                  <Button
                    variant="text"
                    onClick={async () => {
                      await TaskAPI.createTask(
                        taskDescription,
                        taskPriority,
                        taskCompleted,
                        taskEmployeeId
                      );
                      refreshTasks();
                    }}
                  >
                    Submit
                  </Button>
                </form>
              </body>
            </div>
          </div>
        )}
        <button className={Styles.taskButton} onClick={() => refreshTasks()}>Get All Tasks</button>
      </div>
      <div className={Styles.taskList}>
        {tasks.length ? (
          tasks.map((task) => {
            return (
              <div key={task.id}>
                <TaskCard
                  id={task.id}
                  taskDescription={task.description}
                  taskPriority={task.priority}
                  taskCompleted={task.completed}
                  taskEmployeeId={task.employeeId}
                  refreshTasks={refreshTasks}
                  getSingleTask={getSingleTask}
                />
                <button className={Styles.taskButton}
                  onClick={async () => {
                    await TaskAPI.deleteTask(task.id);
                    refreshTasks();
                  }}
                >
                  Delete
                </button>
                <button className={Styles.taskButton}
                  onClick={async () => {
                    await TaskAPI.unassignTask(task.id);
                    refreshTasks();
                  }}
                >
                  Unassign
                </button>
                <button className={Styles.taskButton} onClick={() => handleGoTaskPage(task.id)}>
                      View Task
                    </button>
              </div>
            );
          })
        ) : (
          <h3>No Tasks</h3>
        )}
      </div>
    </div>
  );
}

export default Taskpage;
