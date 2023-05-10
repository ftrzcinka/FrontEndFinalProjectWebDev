import React from "react";
import Styles from "./styles.module.css";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";

function Contactpage() {
  return (
    <div>
      <Navbar />
      <div className={Styles.container}>
        <section className="contact-section">
          <h1>Contact Us</h1>
          <form action="#" method="POST">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                required
              ></textarea>
            </div>
            <input type="submit" value="Submit" />
          </form>
        </section>
      </div>
    </div>
  );
}

export default Contactpage;
