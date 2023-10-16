import React, { Fragment } from "react";

import styles from "./AppLogo.module.css";
import Buds from "@mui/icons-material/Savings";
import Button from "./Button";
import { Link } from "react-router-dom";

const AppLogo = (props) => {
  return (
    <Fragment>
      <div className={styles.container}>
        <div className={styles["app-name"]}>
          <h1>
            <Buds></Buds> Buds
          </h1>
          <p>Buds es una aplicación de uso personal que te permite llevar el control de tu presupuesto mensual, ingresos y gastos. </p>
        </div>
      </div>
      <div className={styles["form__actions"]}>
        <Link  to={'/auth?mode=login'} >
            Comenzar
          </Link>
        </div>
    </Fragment>
  );
};

export default AppLogo;
