import React from "react";
import ExpenseItem from "./ExpenseItem";
import styles from "./ExpenseList.module.css";
const ExpenseList = (props) => {


  return (
    <section className={styles["expense-section"]}>
      <h1 className={styles["expense-section_Title"]}>Distribución</h1>
      <div className={styles["expense-container"]}>
        {props.list.map((expense) => (
          <ExpenseItem key={expense._id} item={expense} submittedExpenseHandler={props.submittedExpenseHandler}></ExpenseItem>
        ))}
      </div>
    </section>
  );
};

export default ExpenseList;
