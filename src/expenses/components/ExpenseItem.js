import React, { useState } from "react";
import styles from "./ExpenseItem.module.css";
import Button from "../../shared/Components/Button";

const ExpenseItem = (props) => {
  const [display, setDisplay] = useState("none");

  const clickHandler = (event) => {
    console.log(event);
    setDisplay("block");
  };

  const leaveHandler = (event) => {
    console.log(event.target);
    setDisplay("none");
  };

  return (
    <div onMouseLeave={leaveHandler} className={styles.expenseItem}>
      <h1 onClick={clickHandler} className={styles.title}>
        {props.item.title} $ {props.item.totalBudget}
      </h1>

      <div className={styles["expense-detail"]} style={{ display: display }}>
        <h2>Disponible: ${props.item.availableBudget}</h2>
        <h3>Consumido: ${props.item.usedBudget}</h3>
        <h2>Registros: {props.item.records}</h2>
      </div>
      <div className= {styles["form-control__button"]}>
        <Button type="submit">+</Button>
      </div>
    </div>
  );
};

export default ExpenseItem;
