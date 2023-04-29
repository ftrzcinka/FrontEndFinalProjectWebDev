import React from "react";
import Styles from "./styles.module.css";
import { Link } from "react-router-dom";

function Homepage() {
  return (
    <>
      <div>
        <div>
          <div className={Styles.navContainer}>
            <Link
              to="/tasks"
              style={{ textDecoration: "none", color: "black" }}
            >
              <div className={Styles.taskContainer}>TASKS</div>
            </Link>
            <Link
              to="/employees"
              style={{ textDecoration: "none", color: "black" }}
            >
              <div className={Styles.employeesContainer}>EMPLOYEES</div>
            </Link>
          </div>
          <h1>Home Page</h1>
          <div></div>
        </div>
      </div>
    </>
  );
}

export default Homepage;
