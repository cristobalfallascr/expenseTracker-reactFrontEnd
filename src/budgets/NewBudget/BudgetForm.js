import React, { useState } from "react";

import styles from "./BudgetForm.module.css";
import { resolvePath } from "react-router-dom";

const BudgetForm = () => {
  const [userInput, setUserInput] = useState({
    title: "",
    description: "",
    budgetTotalAmount: "",
  });
  const titleChangeHandler = (event) => {
    setUserInput((previousState) => {
      return { ...previousState, title: event.target.value };
    });
  };

  const descriptionChangeHandler = (event) => {
    setUserInput((previousState) => {
      return { ...previousState, description: event.target.value };
    });
  };

  const amountChangeHandler = (event) => {
    setUserInput((previousState) => {
      return { ...previousState, budgetTotalAmount: event.target.value };
    });
  };

  const formSubitHandler = async (event) => {
    //Prevent default behavior always in forms
    event.preventDefault();
    // const newBudget = {
    //   title: userInput.title,
    //   description: userInput.description,
    //   budgetTotalAmount: userInput.budgetTotalAmount,
    // };

    const response = await fetch(
      "http://172.31.187.6:8080/budgets/create-budget",
      {
        method: "POST",
        body: JSON.stringify(userInput),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const responseData = await response.json();
    console.log(responseData);
    setUserInput({ title: "", description: "", budgetTotalAmount: "" });
    alert(responseData.message);
  };

  return (
    <form onSubmit={formSubitHandler}>
      <div className={styles["new-budget__controls"]}>
        <div className={styles["new-budget__control"]}>
          <label>Nombre</label>
          <input
            type="text"
            value={userInput.title}
            onChange={titleChangeHandler}
          ></input>
        </div>
        <div className={styles["new-budget__control"]}>
          <label>Decripción</label>
          <textarea
            value={userInput.description}
            type="text"
            onChange={descriptionChangeHandler}
          ></textarea>
        </div>
        <div className={styles["new-budget__control"]}>
          <label>Presupuesto ₡</label>
          <input
            value={userInput.budgetTotalAmount}
            onChange={amountChangeHandler}
            type="text"
          ></input>
        </div>
        <div className={styles["new-budget__actions"]}>
          <button type="submit">Comenzar</button>
        </div>
      </div>
    </form>
  );
};

export default BudgetForm;
