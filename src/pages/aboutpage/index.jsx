import React from "react";
import Styles from "./styles.module.css";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";

function Aboutpage() {
  return (
    <div>
      <Navbar />
      <div className={Styles.aboutsection}>
        <h1>About Us</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
          aliquet quam id dui posuere blandit. Pellentesque in ipsum id orci
          porta dapibus. Curabitur non nulla sit amet nisl tempus convallis quis
          ac lectus. Proin eget tortor risus. Mauris blandit aliquet elit, eget
          tincidunt nibh pulvinar a. Vestibulum ante ipsum primis in faucibus
          orci luctus et ultrices posuere cubilia Curae; Donec velit neque,
          auctor sit amet aliquam vel, ullamcorper sit amet ligula.
        </p>
        <p>
          Quisque velit nisi, pretium ut lacinia in, elementum id enim.
          Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Nulla
          quis lorem ut libero malesuada feugiat. Curabitur aliquet quam id dui
          posuere blandit. Nulla porttitor accumsan tincidunt. Lorem ipsum dolor
          sit amet, consectetur adipiscing elit. Donec sollicitudin molestie
          malesuada.
        </p>
      </div>
    </div>
  );
}

export default Aboutpage;
