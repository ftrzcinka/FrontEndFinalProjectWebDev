import React, { useEffect, useState } from "react";
import Styles from "./styles.module.css";
import { Link } from "react-router-dom";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const TaskInfo = ({ Description, Priority, CompletionStatus, Employee }) => {
  return (
    <div className="task">
      <h4>{Description}</h4>
      <h4>{Priority}</h4>
      <h4>{CompletionStatus}</h4>
      <h4>{Employee}</h4>
    </div>
  );
};

function Taskpage() {
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState();
  const [completed, setCompleted] = useState(false);
  const [employeeId, setEmployeeId] = useState();

  const [task, setTask] = useState([]);

  function submitTask(description, priority, completed, employeeId) {
    console.log(description, priority, completed, employeeId);
    axios
      .post("http://localhost:5001/task/create", {
        description: description,
        priority: priority,
        completed: completed,
        employeeId: employeeId || null,
      })
      .then((response) => {
        console.log("Added task");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // useEffect(() => {
  //   const fetchTask = async() => {
  //     const response = await fetch ('/source')
  //     const data = await response.json();
  //     setTask(data);
  //   }
  // })

  return (
    <>
      <div>
        <div
          className={Styles.navContainer}
          style={{ display: "flex", justifyContent: "space-evenly" }}
        >
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to="/"
            className={Styles.homeContainer}
          >
            HOMEPAGE
          </Link>
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to="/employees"
            className={Styles.employeeContainer}
          >
            EMPLOYEES
          </Link>
        </div>
      </div>
      <div>
        <form>
          <TextField
            label="Description"
            variant="outlined"
            onChange={(event) => setDescription(event.target.value)}
          />
          <br></br>
          <TextField
            label="Priority"
            variant="outlined"
            onChange={(event) => setPriority(event.target.value)}
          />
          <br></br>
          <TextField
            label="Completed"
            variant="outlined"
            onChange={(event) => setCompleted(event.target.value)}
          />
          <br></br>
          <TextField
            label="Employee ID"
            variant="outlined"
            onChange={(event) => setEmployeeId(event.target.value)}
          />
          <br></br>
          <Button
            variant="outlined"
            onClick={() =>
              submitTask(description, priority, completed, employeeId)
            }
          >
            Submit
          </Button>
        </form>
      </div>

      <div className="Task-List">
        <h1>Task Page</h1>
        {task.length ? (
          task.map((task) => (
            <TaskInfo
              key={task.id}
              Description={task.Description}
              Priority={task.Priority}
              CompletionStatus={task.CompletionStatus}
              Employee={task.Employee}
            />
          ))
        ) : (
          <h3>No Tasks</h3>
        )}
      </div>
    </>
  );
}

export default Taskpage;
