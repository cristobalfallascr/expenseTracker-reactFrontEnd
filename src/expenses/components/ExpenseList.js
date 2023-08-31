import React from "react";
import ExpenseItem from "./ExpenseItem";
import styles from "./ExpenseList.module.css";
const ExpenseList = (props) => {
  return (
    <div>
      <h1>Rubros</h1>
      <div className={styles["expense-container"]}>
        {props.list.map((expense) => (
          <ExpenseItem key={expense.id} item={expense}></ExpenseItem>
        ))}
      </div>
    </div>
  );
};

export default ExpenseList;
