import React from "react";
import { Link } from "react-router-dom";
import styles from "./Navigation.module.css";

const MainNavigation = () => {
  return (
    <header className={styles.header}>
  
      <nav>
        <ul className={styles.list}>
          <li>
            <Link to="/">Inicio</Link>
          </li>
          <li>
            <Link to="/contact">Contacto</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
