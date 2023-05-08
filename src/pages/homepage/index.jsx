import React from "react";
import Styles from "./styles.module.css";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";

function Homepage() {
  return (
    <div>
      <Navbar />

      {/* <div className={Styles.boxNavContainer}>
        <Link to="/tasks" style={{ textDecoration: "none", color: "black" }}>
          <div className={Styles.taskContainerBox}>TASKS</div>
        </Link>
        <Link
          to="/employees"
          style={{ textDecoration: "none", color: "black" }}
        >
          <div className={Styles.employeesContainerBox}>EMPLOYEES</div>
        </Link>
      </div> */}
    </div>
  );
}

export default Homepage;
