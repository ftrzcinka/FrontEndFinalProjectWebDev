import React from "react";
import Styles from "./styles.module.css";
import { Link } from "react-router-dom";
import Logo from "../../images/homepagelogo.png";

function Navbar() {
  return (
    <div className={Styles.container}>
      <img className={Styles.home_image} src={Logo} alt="homepagelogo" />
      <Link
        style={{ textDecoration: "none", color: "black" }}
        to="/FrontEndFinalProjectWebDev"
      >
        <div className={Styles.brandname}>AquaSlope</div>
      </Link>

      <div className={Styles.link_list}>
        <ul className={Styles.page_links}>
          <Link
            to="/FrontEndFinalProjectWebDev/about"
            style={{ textDecoration: "none", color: "black" }}
          >
            <li className={Styles.link}>About</li>
          </Link>
          <Link
            to="/FrontEndFinalProjectWebDev/contact"
            style={{ textDecoration: "none", color: "black" }}
          >
            <li className={Styles.link}> Contact</li>
          </Link>
        </ul>
        <ul className={Styles.app_links}>
          <Link
            to="/FrontEndFinalProjectWebDev/tasks"
            style={{ textDecoration: "none", color: "black" }}
          >
            <li className={Styles.link}>Tasks</li>
          </Link>
          <Link
            to="/FrontEndFinalProjectWebDev/employees"
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
