import React from "react";
import ExpenseItem from "./ExpenseItem";
import styles from "./ExpenseList.module.css";
const ExpenseList = (props) => {
  console.log(props);

  return (
    <section className={styles["expense-section"]}>
      <h1 className={styles["expense-section_Title"]}>Rubros</h1>
      <div className={styles["expense-container"]}>
        {props.list.map((expense) => (
          <ExpenseItem key={expense._id} item={expense}></ExpenseItem>
        ))}
      </div>
    </section>
  );
};

export default ExpenseList;
