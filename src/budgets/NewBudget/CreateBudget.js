import React, { useState } from "react";

import styles from "./CreateBudget.module.css";

import BudgetForm from "./BudgetForm";

const submit = (event) => {
  // "http://172.31.187.6:8080/budgets/create-budget"
  console.log(event.target);
};

const CreateBudget = () => {
  // Call React hooks here
  const [title, setTitle] = useState("");
  return (
    <div className={styles["form-container"]}>
      <h3>Crear Presupuesto</h3>
      <BudgetForm></BudgetForm>
    </div>
  );
};

export default CreateBudget;
