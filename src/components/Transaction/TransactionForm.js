import React, { useState, useEffect } from "react";
import { Form, useParams } from "react-router-dom";

import Modal from "../Shared/Modal";
import Input from "../Shared/Input";
import Button from "../Shared/Button";

import styles from "./NewTransactionForm.module.css";

const TransactionForm = (props) => {

  const params = useParams();

  const newTransactionActionUrl = `/user/${params.userId}/budgets/${params.budgetId}/add-transaction`;
  ///////////////////////////////////////Managing state

  const [userInput, setUserInput] = useState({
    title: "",
    usedAmount: "",
  });

  const [titleValidity, setTitleValidity] = useState(true);

  const [amountValidity, setAmountValidity] = useState(true);
  const [formValidity, setFormValidity] = useState(null);

  useEffect(() => {
    const timerIdentifier = setTimeout(() => {
      setFormValidity(
        userInput.title.trim().length > 3 && userInput.usedAmount > 0
      );
    }, 500);
    //This is a cleanup function
    return () => {
      clearTimeout(timerIdentifier);
    }; //This is a cleanup function
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInput.title, userInput.usedAmount]);

  const transactionTitleChangehandler = (event) => {
    setUserInput((prevState) => {
      return { ...prevState, title: event.target.value };
    });
  };

  const usedAmountChangehandler = (event) => {
    setUserInput((prevState) => {
      return { ...prevState, usedAmount: event.target.value };
    });
  };

  const checkInputValidity = (event) => {
    const inputName = event.target.name;
    if (inputName === "title")
      setTitleValidity(event.target.value.trim().length > 3);

    if (inputName === "usedAmount") setAmountValidity(event.target.value > 0);
  };

  return (
    <Modal onBackdropClick={props.hideFormHandler}>
      <Form
        className={styles.form}
        method="post"
        action={newTransactionActionUrl}
        onSubmit={props.hideFormHandler}
      >
        <div className={styles["form-title"]}>
          <h1>Uso de dinero de {props.type}</h1>
        </div>
        <div className={styles["form-control"]}>
          <label className={styles["label-title"]}>Agrega un nombre</label>
          <Input
            name="title"
            onChange={transactionTitleChangehandler}
            inputType="input"
            type="text"
            placeholder="Nombre o título"
            value={userInput.title}
            formValidity={titleValidity}
            onBlur={checkInputValidity}
          ></Input>
        </div>

        <div className={styles["form-control"]}>
          <label className={styles["label-title"]}>Monto Usado</label>
          <Input
            name="usedAmount"
            inputType="input"
            type="text"
            placeholder="₡"
            onChange={usedAmountChangehandler}
            value={userInput.budgetedAmount}
            formValidity={amountValidity}
            onBlur={checkInputValidity}
          ></Input>
          <Input
            type="hidden"
            name="expenseId"
            value={props.expenseId}
            inputType="input"
          />

          <Input
            type="hidden"
            name="type"
            value={props.type}
            inputType="input"
          />
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

export default TransactionForm;
