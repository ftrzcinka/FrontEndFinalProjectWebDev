import React, { useState, useEffect } from "react";
import Styles from "./styles.module.css";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import EmployeeAPI from "./api";
import EmployeeCard from "../../components/EmployeeCard";
import TaskAPI from "../taskpage/api";
import TaskCard from "../../components/TaskCard";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
import Background from "../../images/background.png";

function Employeepage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [department, setDepartment] = useState("");
  const [employees, setEmployees] = useState([]);
  const [employee, setEmployee] = useState();
  const [tasks, setTasks] = useState([]);
  const [modal, setModal] = useState(false);

  const navigate = useNavigate();

  const handleGoEmployeePage = (id) => {
    navigate(`/FrontEndFinalProjectWebDev/employee/${id}`);
  };

  const handleGoTaskPage = (id) => {
    navigate(`/FrontEndFinalProjectWebDev/task/${id}`);
  }

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

  const refreshOneEmployee = async (id) => {
    const foundEmployee = await EmployeeAPI.findEmployee(id);
    setEmployee(foundEmployee.employee);
  }

  useEffect(() => {
    refreshEmployees();
    refreshTasks();
  }, []);

  console.log("task data", tasks);
  //probably need to reorganize the output here- create new employee button might be a modal
  return (
    <div>
      <Navbar />
      <img className={Styles.background_img} src={Background} /> 
      <div className={Styles.miniHeaderButtons}>
        <button className={Styles.employeeButton} onClick={toggleModal} >
          Create New Employee
        </button>
        {modal && (
          <div className={Styles.createEmployeeModal}>
            <div>
              <header>
                <h2>Add a New Employee!</h2>
              </header>
              <body>
                <form >
                  <TextField className={Styles.formModal}
                    label="First Name"
                    variant="outlined"
                    onChange={(event) => setFirstName(event.target.value)}
                  />
                  <br></br>
                  <TextField className={Styles.formModal}
                    label="Last Name"
                    variant="outlined"
                    onChange={(event) => setLastName(event.target.value)}
                  />
                  <br></br>
                  <TextField className={Styles.formModal}
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
        <button className={Styles.employeeButton} onClick={() => refreshEmployees()}>Get All Employees</button>
      </div>
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
                  refreshOneEmployee={() => refreshOneEmployee(employee.id)}
                />
                <button className={Styles.employeeButton}
                  onClick={async () => {
                    await EmployeeAPI.deleteEmployee(employee.id);
                    refreshEmployees();
                  }}
                >
                  Delete User
                </button>
                <button className={Styles.employeeButton}
                  onClick={() => handleGoEmployeePage(employee.id)}
                >
                  View Employee
                </button>
                <br></br>
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
                        <button className={Styles.employeeButton}
                          onClick={async () => {
                            await TaskAPI.deleteTask(task.id);
                            refreshTasks();
                          }}
                        >
                          Delete Task
                        </button>
                        <button className={Styles.employeeButton}
                          onClick={async () => {
                            await TaskAPI.unassignTask(task.id);
                            refreshTasks();
                          }}
                        >
                          Unassign Task
                        </button>
                        <button className={Styles.employeeButton} onClick={() => handleGoTaskPage(task.id)}>
                          View Task
                        </button>
                        <br></br>
                        <br></br>
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
