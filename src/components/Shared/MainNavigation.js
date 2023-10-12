import React from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./Navigation.module.css";
const MainNavigation = () => {
  const params = useParams();
  
  return (
    <header className={styles.header}>
      <nav>
        <ul className={styles.list}>
          <li>
            <Link to={"/user/"+params.userId}>Presupuestos</Link>
          </li>
          {/* <li>
            <Link to="/expenses">Gastos</Link>
          </li> */}
          <li>
            <Link to="/logout">Cerrar Sesión</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
