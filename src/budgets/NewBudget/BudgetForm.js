import React, { useState } from "react";

import styles from "./BudgetForm.module.css";

import Button from "../../shared/Components/Button";
import Input from "../../shared/Components/Input";

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
      "http://172.31.189.100:8080/budgets/create-budget",
      {
        method: "POST",
        body: JSON.stringify(userInput),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).catch((err) => {
      alert("La conexion fallo!")
      console.log("Unable to save - " + err);
      return;
    });

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
          <Input
            inputType="input"
            type="text"
            value={userInput.title}
            onChange={titleChangeHandler}
          ></Input>
        </div>
        <div className={styles["new-budget__control"]}>
          <label>Decripción</label>
          <Input
            inputType="textarea"
            value={userInput.description}
            type="text"
            onChange={descriptionChangeHandler}
          ></Input>
        </div>
        <div className={styles["new-budget__control"]}>
          <label>Presupuesto ₡</label>
          <Input
            inputType="input"
            value={userInput.budgetTotalAmount}
            onChange={amountChangeHandler}
            type="text"
          ></Input>
        </div>

        <div className={styles["new-budget__actions"]}>
          <Button className="" type="submit" onClick="">
            Comenzar
          </Button>
        </div>
      </div>
    </form>
  );
};

export default BudgetForm;
