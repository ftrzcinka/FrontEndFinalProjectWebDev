import React from "react";
import Styles from "./styles.module.css";

import { Link } from "react-router-dom";


function Homepage() {
  
  return (
    <>
      <div>
        <h1>Home Page</h1>
        <br></br>
        <div>
          <Link to='/tasks'>
            <button className={Styles.button}>Tasks</button>
          </Link>
          <Link to='/employees'>
            <button className={Styles.button}>Employee</button>
          </Link>
          
        </div>
        <br></br>
        <div className={Styles.link_list}>TASKS HERE</div>
        <br></br>
        <div className={Styles.link_list}>EMPLOYEES HERE</div>
        
      </div>
    </>
  );
}

export default Homepage;
