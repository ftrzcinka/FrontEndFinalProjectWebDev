import React, {useState, useEffect} from "react";
import Styles from "./styles.module.css";
import { Link } from "react-router-dom";


const Employee = ({
  FName, LName, Department
}) => {
  return (
    <div className="Employee">
      <h3>{FName}</h3>
      <h4>{LName}</h4>
      <h4>{Department}</h4>
    </div>
  )
}


function Employeepage() {

  const [employees, setEmployees] = useState([]);
  const [modal, setModal] = useState(false);


  const toggleModal = () => {
    setModal(!modal);
  }

  
      
    
  

  useEffect(() => {
    //fetch here from backend and set 
    const fetchEmployee = async() => {
      const response = await fetch('/source')
      const data = await response.json();
      setEmployees(data)
    };

    fetchEmployee();
  }, []);


  
//probably need to reorganize the output here- create new employee button might be a modal
  return (
    <>
    
      <div>
        <div className={Styles.navContainer} style={{display: 'flex', justifyContent: 'space-evenly'}}>
          <Link style={{ textDecoration: "none", color: "black" }} to='/' className={Styles.homeContainer}>HOMEPAGE</Link>
          <Link style={{ textDecoration: "none", color: "black" }} to='/tasks' className={Styles.taskContainer}>TASKS</Link>
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
                  <label>First Name:<input type="text" name="FName"></input></label>
                  <br></br>
                  <label>Last Name:<input type="text" name="LName"></input></label>
                  <br></br>
                  <label>Department:<input type="text" name="Department"></input></label>
                  <br></br>
                  <input type="submit" value='Create'></input>
                </form>
              </body>
            </div>
          </div>
        )}
        <div className="Employee-List">
          {employees.map((employee) => (
            <Employee
              key = {employee.id}
              Name = {employee.FName}
              Title= {employee.LName}
              Department ={employee.Department}
            />
          ))}
          <button>Delete</button>
        </div>
      </div>
    </>
  );
}

export default Employeepage;
