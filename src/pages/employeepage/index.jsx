import React, { useState, useEffect } from "react";
import Styles from "./styles.module.css";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import EmployeeAPI from "./api";
import EmployeeCard from "../../components/EmployeeCard";
import TaskAPI from "../taskpage/api";
import TaskCard from "../../components/TaskCard";

function Employeepage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [department, setDepartment] = useState("");
  const [employees, setEmployees] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  const refreshEmployees = async () => {
    const allEmployees = await EmployeeAPI.getAllEmployees();
    setEmployees(allEmployees);
  };

  const refreshTasks = async () => {
    const allTasks = await TaskAPI.getAllTasks();
    setTasks(allTasks);
  };

  useEffect(() => {
    refreshEmployees();
    refreshTasks();
  }, []);

  console.log("task data", tasks);
  //probably need to reorganize the output here- create new employee button might be a modal
  return (
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
          to="/tasks"
          className={Styles.taskContainer}
        >
          TASKS
        </Link>
      </div>
      <button onClick={toggleModal} style={{ marginTop: "120px" }}>
        Create New Employee
      </button>
      {modal && (
        <div className={Styles.createEmployeeModal}>
          <div>
            <header>
              <h2>Add a New Employee!</h2>
            </header>
            <body>
              <form>
                <TextField
                  label="First Name"
                  variant="outlined"
                  onChange={(event) => setFirstName(event.target.value)}
                />
                <br></br>
                <TextField
                  label="Last Name"
                  variant="outlined"
                  onChange={(event) => setLastName(event.target.value)}
                />
                <br></br>
                <TextField
                  label="Department"
                  variant="outlined"
                  onChange={(event) => setDepartment(event.target.value)}
                />
                <br></br>
                <Button
                  variant="text"
                  onClick={async () => {
                    await EmployeeAPI.createEmployee(
                      firstName,
                      lastName,
                      department
                    );
                    refreshEmployees();
                  }}
                >
                  Submit
                </Button>
              </form>
            </body>
          </div>
        </div>
      )}
      <Button onClick={() => refreshEmployees()}>get All Employees</Button>

      <div className={Styles.employeeList}>
        {employees.length ? (
          employees.map((employee) => {
            return (
              <div key={employee.id}>
                <EmployeeCard
                  id={employee.id}
                  firstName={employee.firstname}
                  lastName={employee.lastname}
                  department={employee.department}
                  refreshEmployees={refreshEmployees}
                />
                <button
                  onClick={async () => {
                    await EmployeeAPI.deleteEmployee(employee.id);
                    refreshEmployees();
                  }}
                >
                  Delete User
                </button>
                <br></br>
                <br></br>
                {tasks.map((task) => {
                  if (task.employeeId === employee.id) {
                    return (
                      <div key={task.id}>
                        <TaskCard
                          id={task.id}
                          taskDescription={task.description}
                          taskPriority={task.priority}
                          taskCompleted={task.completed}
                          taskEmployeeId={task.employeeId}
                          refreshTasks={refreshTasks}
                        />
                        <button
                          onClick={async () => {
                            await TaskAPI.deleteTask(task.id);
                            refreshTasks();
                          }}
                        >
                          Delete Task
                        </button>
                        <button
                          onClick={async () => {
                            await TaskAPI.unassignTask(task.id);
                            refreshTasks();
                          }}
                        >
                          Unassign Task
                        </button>
                      </div>
                    );
                  }
                })}
              </div>
            );
          })
        ) : (
          <h3>No Employees</h3>
        )}
      </div>
    </div>
  );
}

export default Employeepage;
