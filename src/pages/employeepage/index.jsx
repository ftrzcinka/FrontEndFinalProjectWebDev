import React, { useState, useEffect } from "react";
import Styles from "./styles.module.css";
import { Link } from "react-router-dom";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const Employee = ({ FName, LName, Department }) => {
  return (
    <div className="Employee">
      <h3>{FName}</h3>
      <h4>{LName}</h4>
      <h4>{Department}</h4>
    </div>
  );
};

function Employeepage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [department, setDepartment] = useState("");
  const [employees, setEmployees] = useState([]);
  const [modal, setModal] = useState(false);

  async function submitEmployee(firstName, lastName, department) {
    console.log(firstName, lastName, department);
    axios
    .post("http://localhost:5001/employee/create", {
      firstname: firstName,
      lastname: lastName,
      department: department,
    })
    .then((response) => {
      console.log("Added employee");
    })
    .catch((err) => {
      console.log(err);
    });
  }
  const toggleModal = () => {
    setModal(!modal);
  };

  // useEffect(() => {
  //   //fetch here from backend and set
  //   const fetchEmployee = async () => {
  //     const response = await fetch("/source");
  //     const data = await response.json();
  //     setEmployees(data);
  //   };

  //   fetchEmployee();
  // }, []);

  //probably need to reorganize the output here- create new employee button might be a modal
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
            to="/tasks"
            className={Styles.taskContainer}
          >
            TASKS
          </Link>
        </div>
        <button onClick={toggleModal}>Create New Employee</button>
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
                    onClick={() =>
                      submitEmployee(firstName, lastName, department)
                    }
                  >
                    Submit
                  </Button>
                </form>
              </body>
            </div>
          </div>
        )}
        <div className="Employee-List">
          {employees.length ? (
            employees.map((employee) => (
              <div>
                <Employee
                  key={employee.id}
                  Name={employee.FName}
                  Title={employee.LName}
                  Department={employee.Department}
                />
                <button>Delete</button>
              </div>
            ))
          ) : (
            <h3>No Employees</h3>
          )}
        </div>
      </div>
    </>
  );
}

export default Employeepage;
