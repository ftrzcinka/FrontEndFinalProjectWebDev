import React, { useState, useEffect } from "react";
import Styles from "./styles.module.css";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import EmployeeAPI from "./api";

const Employee = ({ FName, LName, Department }) => {
  return (
    <div className="Employee">
      {FName}
      {LName}
      {Department}
    </div>
  );
};

function Employeepage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [department, setDepartment] = useState("");
  const [employees, setEmployees] = useState([]);
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  // useEffect(() => {
  //   axios.get("http://localhost:5001/employee/all").then((response) => {
  //     setEmployees(response.data);
  //   });
  // });
  async function updateEmployees() {
    const allEmployees = await EmployeeAPI.getAllEmployees();
    setEmployees(allEmployees);
  }

  useEffect(() => {
    updateEmployees();
  }, []);

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
                  onClick={async () => {
                    await EmployeeAPI.createEmployee(
                      firstName,
                      lastName,
                      department
                    );
                    updateEmployees();
                  }}
                >
                  Submit
                </Button>
              </form>
            </body>
          </div>
        </div>
      )}
      <Button onClick={() => updateEmployees()}>get All Employees</Button>

      <div className="Employee-List">
        {employees.length ? (
          employees.map((employee) => {
            return (
              <div key={employee.id}>
                <Employee
                  FName={employee.firstname}
                  LName={employee.lastname}
                  Department={employee.department}
                />
                <button
                  onClick={async () => {
                    await EmployeeAPI.deleteEmployee(employee.id);
                    updateEmployees();
                  }}
                >
                  Delete
                </button>
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
