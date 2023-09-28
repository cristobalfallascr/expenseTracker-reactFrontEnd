import React, { useState } from "react";

import Modal from "../../shared/Components/Modal";
import Input from "../../shared/Components/Input";
import Button from "../../shared/Components/Button";

import styles from "./NewExpenseForm.module.css";

const NewExpenseForm = (props) => {
  const [userInput, setUserInput] = useState({
    title: "",
    type: "",
    budgetedAmount: "",
  });

  const expenseNameChangehandler = (event) => {
    setUserInput((prevState) => {
      return { ...prevState, title: event.target.value };
    });
  };

  const expenseTypeChangehandler = (event) => {
    setUserInput((prevState) => {
      return { ...prevState, type: event.target.value };
    });
  };

  const expenseAmountChangehandler = (event) => {
    setUserInput((prevState) => {
      return { ...prevState, budgetedAmount: event.target.value };
    });
  };

  const formSubmitHandler = async (event) => {
    event.preventDefault();

    const expenseData = { ...userInput, budgetId: props.budgetId };

    const response = await fetch(
      "https://budgetbe.azurewebsites.net/budgets/add-expense",
      {
        method: "POST",
        body: JSON.stringify(expenseData),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const responseData = await response.json();

    setUserInput({ name: "", type: "", expenseAmount: "" });
    props.hideFormHandler();
    props.submittedExpenseHandler();
  };

  return (
    <Modal onBackdropClick={props.hideFormHandler}>
      <form className={styles.form} onSubmit={formSubmitHandler}>
        <div className={styles["form-title"]}>
          <h1> Gasto presupuestado</h1>
        </div>
        <div className={styles["form-control"]}>
          <label className={styles["label-title"]}>Agrega un nombre</label>
          <Input
            name="title"
            onChange={expenseNameChangehandler}
            inputType="input"
            type="text"
            placeholder="Nombre o título"
            value={userInput.title}
          ></Input>
        </div>
        <div className={styles["form-control"]}>
          <label className={styles["label-title"]}>Tipo</label>
          <Input
            name="type"
            inputType="input"
            type="text"
            placeholder="Tipo"
            onChange={expenseTypeChangehandler}
            value={userInput.type}
          ></Input>
        </div>
        <div className={styles["form-control"]}>
          <label className={styles["label-title"]}>Monto presupuestado</label>
          <Input
            name="expenseAmount"
            inputType="input"
            type="text"
            placeholder="₡"
            onChange={expenseAmountChangehandler}
            value={userInput.budgetedAmount}
          ></Input>
        </div>
        <div className={styles["form-control"]}>
          <Button type="submit">Agregar</Button>
        </div>
      </form>
    </Modal>
  );
};

export default NewExpenseForm;
