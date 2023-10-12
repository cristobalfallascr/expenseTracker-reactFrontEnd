import React, { useState, useEffect } from "react";

import styles from "./BudgetForm.module.css";

import Button from "../Shared/Button";
import Input from "../Shared/Input";

const BudgetForm = () => {
  //////////////////////// Managing State

  const [userInput, setUserInput] = useState({
    title: "",
    description: "",
    budgetTotalAmount: "",
    userId: localStorage.getItem("user"),
  });

  const [titleValidity, setTitleValidity] = useState(true);
  const [descriptionValidity, setDescriptionValidity] = useState(true);
  const [amountValidity, setAmountValidity] = useState(true);
  const [formValidity, setFormValidity] = useState(null);

  useEffect(() => {
    const timerIdentifier = setTimeout(() => {
      setFormValidity(
        userInput.title.trim().length > 3 &&
          userInput.budgetTotalAmount.trim().length > 0
      );
    }, 500);
    //This is a cleanup function
    return () => {
      clearTimeout(timerIdentifier);
    }; //This is a cleanup function
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInput.title, userInput.budgetTotalAmount]);
  ////////////////////// Change Handlers
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

  const checkInputValidity = (event) => {
    const inputName = event.target.name;
    if (inputName === "title")
      setTitleValidity(event.target.value.trim().length > 3);

    if (inputName === "expenseAmount")
      setAmountValidity(event.target.value.trim().length > 0);
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
      `${process.env.REACT_APP_BACKEND}/budgets/create-budget`,
      {
        method: "POST",
        body: JSON.stringify(userInput),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).catch((err) => {
      alert("La conexion fallo!");
      console.log("Unable to save - " + err);
      return;
    });

    const responseData = await response.json();
    console.log(responseData);
    setUserInput({ title: "", description: "", budgetTotalAmount: "" });
  };

  return (
    <form onSubmit={formSubitHandler}>
      <div className={styles["new-budget__controls"]}>
        <div className={styles["new-budget__control"]}>
          <label>Nombre</label>
          <Input
            name="title"
            inputType="input"
            type="text"
            value={userInput.title}
            onChange={titleChangeHandler}
            formValidity={titleValidity}
            onBlur={checkInputValidity}
          ></Input>
        </div>
        <div className={styles["new-budget__control"]}>
          <label>Decripción</label>
          <Input
            name="description"
            inputType="textarea"
            value={userInput.description}
            type="text"
            onChange={descriptionChangeHandler}
          ></Input>
        </div>
        <div className={styles["new-budget__control"]}>
          <label>Presupuesto ₡</label>
          <Input
            name="budgetTotalAmount"
            inputType="input"
            value={userInput.budgetTotalAmount}
            onChange={amountChangeHandler}
            type="text"
            formValidity={amountValidity}
            onBlur={checkInputValidity}
          ></Input>
        </div>

        <div className={styles["new-budget__actions"]}>
          <Button className="" type="submit" formValidity={formValidity}>
            Comenzar
          </Button>
        </div>
      </div>
    </form>
  );
};

export default BudgetForm;
