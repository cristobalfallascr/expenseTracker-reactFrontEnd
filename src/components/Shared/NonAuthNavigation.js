import React from "react";
import { Link } from "react-router-dom";
import styles from "./Navigation.module.css";

const MainNavigation = () => {
  return (
    <header className={styles.header}>
  
      <nav>
        <ul className={styles.list}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/auth?mode=login">Sign in</Link>
          </li>
          <li>
            <Link to="/contact">Contact Us</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
