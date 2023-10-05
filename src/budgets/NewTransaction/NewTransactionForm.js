import React, { useState } from "react";

import Modal from "../../shared/Components/Modal";
import Input from "../../shared/Components/Input";
import Button from "../../shared/Components/Button";

import styles from "./NewTransactionForm.module.css";

const NewTransactionForm = (props) => {
  console.log(props);
  const [userInput, setUserInput] = useState({
    title: "",
    type: props.type,
    usedAmount: "",
    expenseId: props.expenseId,
    budgetId: props.budgetId,
  });

  const expenseNameChangehandler = (event) => {
    setUserInput((prevState) => {
      return { ...prevState, title: event.target.value };
    });
  };

  // const expenseTypeChangehandler = (event) => {
  //   setUserInput((prevState) => {
  //     return { ...prevState, type: event.target.value };
  //   });
  // };

  const usedAmountChangehandler = (event) => {
    setUserInput((prevState) => {
      return { ...prevState, usedAmount: event.target.value };
    });
  };

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    console.log(userInput);
    const transactionData = { ...userInput };

    const response = await fetch(
      "https://budgetbe.azurewebsites.net/budgets/add-transaction",
      {
        method: "POST",
        body: JSON.stringify(transactionData),
        headers: {
          "Content-Type": "application/json",
        },
      });
    const responseData = await response.json();

    setUserInput({ name: "", type: "", usedAmount: "" });
    props.hideFormHandler();
    props.submittedExpenseHandler();
  };

  return (
    <Modal onBackdropClick={props.hideFormHandler}>
      <form className={styles.form} onSubmit={formSubmitHandler}>
        <div className={styles["form-title"]}>
          <h1>Transacción para {props.type}</h1>
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
          <label className={styles["label-title"]}>Monto Usado</label>
          <Input
            name="expenseAmount"
            inputType="input"
            type="text"
            placeholder="₡"
            onChange={usedAmountChangehandler}
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

export default NewTransactionForm;
