import React, { useEffect, useState } from "react";
import Styles from "./styles.module.css";
import { Link } from "react-router-dom";

const TaskInfo = ({
  Description, Priority, CompletionStatus, Employee
}) => {
  return (
    <div className="task">
      <h4>{Description}</h4>
      <h4>{Priority}</h4>
      <h4>{CompletionStatus}</h4>
      <h4>{Employee}</h4>
    </div>
  )
}

function Taskpage() {

  const [task, setTask] = useState([]);


  useEffect(() => {
    const fetchTask = async() => {
      const response = await fetch ('/source')
      const data = await response.json();
      setTask(data);
    }
  })

  
  return (
    <>
    <div>
      <div className={Styles.navContainer} style={{display: 'flex', justifyContent: 'space-evenly'}}>
          <Link style={{ textDecoration: "none", color: "black" }} to='/' className={Styles.homeContainer}>HOMEPAGE</Link>
          <Link style={{ textDecoration: "none", color: "black" }} to='/employees' className={Styles.employeeContainer}>EMPLOYEES</Link>
      </div>
    </div>

    <div className="Task-List">
      <h1>Task Page</h1>
      {task.length ? (task.map((task) => (
        <TaskInfo
          key={task.id}
          Description= {task.Description}
          Priority= {task.Priority} 
          CompletionStatus= {task.CompletionStatus}
          Employee= {task.Employee}
          />
      ))
      ): (
        <h3>No Tasks</h3>
      )}
    </div>
    </>
  );
}

export default Taskpage;
