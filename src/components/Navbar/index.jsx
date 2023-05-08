import React from "react";
import Styles from "./styles.module.css";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className={Styles.container}>
      <div className={Styles.brandname}>AquaSlope</div>
      <div className={Styles.link_list}>
        <ul className={Styles.page_links}>
          <li className={Styles.link}>About</li>
          <li className={Styles.link}> Contact</li>
        </ul>
        <ul className={Styles.app_links}>
          <Link to="/tasks" style={{ textDecoration: "none", color: "black" }}>
            <li className={Styles.link}>Tasks</li>
          </Link>
          <Link
            to="/employees"
            style={{ textDecoration: "none", color: "black" }}
          >
            <li className={Styles.link}>Employees</li>
          </Link>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
