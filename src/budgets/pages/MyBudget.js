import React, { Fragment, useState } from "react";
import styles from "./MyBudget.module.css";

const MyBudget = (props) => {
  const [budgetData, setBudgetData] = useState([]);

  const fetchBudget = async () => {
    
    const response = await fetch(
      "http://172.31.189.100:8080/budgets/my-budgets"
    );
    const jsonData = await response.json();
    
    return setBudgetData(jsonData.budget);
  };

  console.log(budgetData)
  return (
    <Fragment>
      <section>
        <button onClick={fetchBudget}>Cargar</button>
        <h1>Test</h1>
      </section>
    </Fragment>
  );
};

export default MyBudget;
