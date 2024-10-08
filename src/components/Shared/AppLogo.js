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
            On-Prem Application
          </h1>
          <p>This is a web application </p>
        </div>
      </div>
      <div className={styles["form__actions"]}>
        <Link  to={'/auth?mode=login'} >
            Start
          </Link>
        </div>
    </Fragment>
  );
};

export default AppLogo;
