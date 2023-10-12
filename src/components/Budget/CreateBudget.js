import React, { useState } from "react";

import styles from "./CreateBudget.module.css";

import Card from "../Shared/Card";
import BudgetForm from "./BudgetForm";

const submit = (event) => {
  console.log(event.target);
};

const CreateBudget = () => {
  // Call React hooks here
  const [title, setTitle] = useState("");
  return (
    <Card >
      <BudgetForm ></BudgetForm>
    </Card>
  );
};

export default CreateBudget;
