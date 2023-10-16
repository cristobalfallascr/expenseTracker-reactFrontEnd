import React from "react";
import { Form, Link, useParams } from "react-router-dom";
import styles from "./Navigation.module.css";
import LogoutIcon from "@mui/icons-material/Logout";
import Button from "./Button";
const MainNavigation = () => {
  const params = useParams();

  return (
    <header className={styles.header}>
      <nav>
        <ul className={styles.list}>
          <li>
            <Link to={"/user/" + params.userId}>Presupuestos</Link>
          </li>

          <li>
            <Link to="/user/profile">Mi perfil</Link>
          </li>
      
        </ul>

      </nav>
      <Form action="/user/logout" method="post">
        <Button formValidity={true}>Salir   </Button>
      </Form>

    </header>
  );
};

export default MainNavigation;
