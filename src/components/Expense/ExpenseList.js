import React, { Fragment, useEffect, useState } from "react";
import ExpenseItem from "./ExpenseItem";
import styles from "./ExpenseList.module.css";
const ExpenseList = (props) => {
  const allExpenseTypes = [];
  props.list.map((expense) => allExpenseTypes.push(expense.type));
  const uniqueExpenseTypes = [...new Set(allExpenseTypes)];

  const arrayofObjects = [];
  uniqueExpenseTypes.forEach((type) => {
    const expense = props.list.filter((expense) => expense.type === type);
    arrayofObjects.push({ type, expense });
  });


  //Sort expenses by Type

  useEffect(() => {
    const sortedExpenses = props.list.sort((a, b) => {
      const nameA = a.type.toUpperCase(); // ignore upper and lowercase
      const nameB = b.type.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
  
      // names must be equal
      return 0;
    });
    console.log(sortedExpenses);

  }, [props.list])
 
  return (
    <section className={styles["expense-section"]}>
      <h1 className={styles["expense-section_Title"]}>Distribución</h1>
      <hr></hr>
      <div className={styles["expense-section"]}>
        {arrayofObjects.map((obj) => (
          <Fragment>
            <p>{obj.type}</p>
            
            <div className={styles["expense-container"]}>
              {obj.expense.map((expense) => (
                <ExpenseItem
                  key={expense._id}
                  item={expense}
                  submittedExpenseHandler={props.submittedExpenseHandler}
                ></ExpenseItem>
              ))}
            </div>
          </Fragment>
        ))}
      </div>
    </section>
  );
};

export default ExpenseList;
