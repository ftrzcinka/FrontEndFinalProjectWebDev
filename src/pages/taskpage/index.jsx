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
  const [modal, setModal] = useState(false);


  const toggleModal = () => {
    setModal(!modal);
  }


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
    <button onClick={toggleModal}>Create a Task</button>
    {modal && (
      <div className={Styles.createTaskModal}>
        <header>
          <h2>Create a Task</h2>
        </header>
        <body>
          <form>
            <label>Description:<input type="text" name="Description"></input></label>
            <br></br>
            <label>Priority:<input type="text" name="Priority"></input></label>
            <br></br>
            <label>Completion Status:<input type="text" name="Status" placeholder="New"></input></label>
            <br></br>
            <label>Employee:<input type="text" name="Employee"></input></label>
            <br></br>
            <input type="submit" value='Create'></input>
          </form>
        </body>
      </div>
    )}
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
