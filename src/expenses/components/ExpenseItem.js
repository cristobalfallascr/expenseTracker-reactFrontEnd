import React, { useState } from "react";
import styles from "./ExpenseItem.module.css";
import Fab from "@mui/material/Fab";

import ControlPointIcon from "@mui/icons-material/ControlPoint";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
const ExpenseItem = (props) => {
  console.log(styles);
  const [display, setDisplay] = useState("none");
  const [isExpanded, setIsExpanded] = useState(false);

  const clickHandler = (event) => {
    if (!isExpanded) {
      setIsExpanded(true);
    } else {
      setIsExpanded(false);
    }
  };

  const leaveHandler = (event) => {
    setIsExpanded(false);
  };

  return (
    <div
      onMouseLeave={leaveHandler}
      className={`${styles["expense-item"]} ${
        styles[isExpanded ? "expanded" : ""]
      }`}
    >
      <div className={styles["expense-item-title"]}>
        <h1 className={styles.title}>{props.item.title}</h1>
        <span onClick={clickHandler} className={styles["expense-item-icon"]}>
          <PlayArrowIcon />
        </span>
      </div>
      <div className={styles["expense-item-detail"]}>
        <p>${props.item.availableBudget} disponible</p>
        <p>Consumido: ${props.item.usedBudget}</p>
        <p>Registros: {props.item.records}</p>
      </div>
    </div>
  );
};

export default ExpenseItem;
