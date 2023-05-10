import React from "react";
import Styles from "./styles.module.css";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Background from "../../images/background.png";

function Homepage() {
  return (
    <div>
      <Navbar />
      <div className={Styles.header}>
        <img className={Styles.background_img} src={Background} />
        {/* <img className={Styles.mobile} src="Mobile.png" />
        <img className={Styles.desktop} src="Desktop.png" /> */}
        {/* <div className={Styles.content_container}>
          <h1 className={Styles.slogan}>
            Tasks Mastered, Teams United - Achieve More with Ease!
          </h1>
          <button className={Styles.button}>Apply</button>
        </div> */}
        <div className={Styles.button_container}>
          <Link
            to="/FrontEndFinalProjectWebDev/tasks"
            style={{ textDecoration: "none", color: "black" }}
          >
            <div className={Styles.tasks_button}>
              <p className={Styles.text}>Tasks</p>
            </div>
          </Link>
          <Link
            to="/FrontEndFinalProjectWebDev/employees"
            style={{ textDecoration: "none", color: "black" }}
          >
            <div className={Styles.employees_button}>
              <p className={Styles.text}>Employees</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
