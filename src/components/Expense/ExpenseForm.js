import React, { useEffect, useState } from "react";
import { Form, useSearchParams, useParams } from "react-router-dom";

import Modal from "../Shared/Modal";
import Input from "../Shared/Input";
import Button from "../Shared/Button";

import styles from "./ExpenseForm.module.css";

const ExpenseForm = (props) => {
  const params = useParams();
  const newExpenseActionUrl =
    "/user/" + props.userId + "/budgets/" + props.budgetId + "/new";

  ////////////////////////////Managing State

  const [userInput, setUserInput] = useState({
    title: "",
    type: "",
    budgetedAmount: "",
  });

  const [titleValidity, setTitleValidity] = useState(true);
  const [typeValidity, setTypeValidity] = useState(true);
  const [amountValidity, setAmountValidity] = useState(true);
  const [formValidity, setFormValidity] = useState(null);

  useEffect(() => {
    const timerIdentifier = setTimeout(() => {
      setFormValidity(
        userInput.title.trim().length > 3 &&
          userInput.type.trim().length > 3 &&
          userInput.budgetedAmount > 0
      );
    }, 500);
    //This is a cleanup function
    return () => {
      clearTimeout(timerIdentifier);
    }; //This is a cleanup function
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInput.title, userInput.type, userInput.budgetedAmount]);

  /////////////////////////Change Handlers

  const expenseTitleChangehandler = (event) => {
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

  const checkInputValidity = (event) => {
    const inputName = event.target.name;
    if (inputName === "title")
      setTitleValidity(event.target.value.trim().length > 3);
    if (inputName === "type")
      setTypeValidity(event.target.value.trim().length > 3);
    if (inputName === "budgetedAmount")
      setAmountValidity(event.target.value > 0);
  };

  return (
    <Modal onBackdropClick={props.hideFormHandler}>
      <Form className={styles.form} method="post" action={newExpenseActionUrl}>
        <div className={styles["form-title"]}>
          <h1>Nuevo Rubro</h1>
        </div>
        <div className={styles["form-control"]}>
          <label className={styles["label-title"]}>Nombre</label>
          <Input
            name="title"
            onChange={expenseTitleChangehandler}
            inputType="input"
            type="text"
            placeholder="Nombre o título"
            value={userInput.title}
            formValidity={titleValidity}
            onBlur={checkInputValidity}
          ></Input>
          {titleValidity === false && (
            <p className={styles.warning}>
              El nombre de contener al menos 3 caracteres
            </p>
          )}
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
            formValidity={typeValidity}
            onBlur={checkInputValidity}
          ></Input>
          {!typeValidity && (
            <p className={styles.warning}>
              El tipo debe contener al menos 3 caracteres
            </p>
          )}
        </div>
        <div className={styles["form-control"]}>
          <label className={styles["label-title"]}>Monto presupuestado</label>
          <Input
            name="budgetedAmount"
            inputType="input"
            type="text"
            placeholder="₡"
            onChange={expenseAmountChangehandler}
            value={userInput.budgetedAmount}
            formValidity={amountValidity}
            onBlur={checkInputValidity}
          ></Input>
          {!amountValidity && (
            <p className={styles.warning}>El monto debe ser mayor a ₡ 0 </p>
          )}
        </div>
        <div className={styles["form-control"]}>
          <Button type="submit" formValidity={formValidity}>
            Agregar
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default ExpenseForm;
