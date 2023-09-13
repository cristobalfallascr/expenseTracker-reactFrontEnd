import React, { Fragment, useState } from "react";
import styles from "./MyBudget.module.css";
import Input from "../../shared/Components/Input";

const MyBudget = (props) => {
  const [budgetData, setBudgetData] = useState([]);
  const [isLoaded, setisLoaded] = useState(false);

  const fetchBudget = async () => {
    const response = await fetch(
      "http://172.31.189.100:8080/budgets/my-budget"
    );
    const jsonData = await response.json();
    setisLoaded(true);
    return setBudgetData(jsonData.budget);
  };

  console.log(budgetData);
  return (
    <Fragment>
      <section className={styles["budget-container"]}>
        {isLoaded ? (
          <div>
            <div className={styles["budget-title"]}>
              <h1>{budgetData.title}</h1>
            </div>
            <p>Monto inicial {budgetData.budgetAmountAvailable}</p>
            <p>Consumido {budgetData.budgetAmountUsed}</p>
            <p>Disponible {budgetData.budgetAmountAvailable}</p>
            <p>Compras {budgetData.expenseCount}</p>
          </div>
        ) : (
          <div className={styles["budget-actions"]}>
            <Input
              inputType="input"
              type="text"
              placeholder="Tu codigo"
            ></Input>
            <button onClick={fetchBudget}>Cargar</button>
          </div>
        )}
      </section>
    </Fragment>
  );
};

export default MyBudget;
