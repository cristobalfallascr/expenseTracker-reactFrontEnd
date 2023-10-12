import React, { Fragment, useEffect, useState } from "react";
import AddExpenseIcon from "@mui/icons-material/AddBusiness";
import { useLoaderData } from "react-router-dom";

import ExpenseForm from "../Expense/ExpenseForm";
import ExpenseList from "../Expense/ExpenseList";
import Button from "../Shared/Button";

import styles from "./BudgetDetail.module.css";

const BudgetDetail = (props) => {
  const data = useLoaderData();
  const budgetData = data.budget;
  console.log(budgetData);

  const [expenseFormShow, setExpeneseFormShow] = useState(false);
  useEffect(() => {
    setExpeneseFormShow(false);
  }, [budgetData.expenseList, budgetData.budgetAmountUsed]);

  const showFormHandler = () => {
    setExpeneseFormShow(true);
  };

  const hideFormHandler = () => {
    setExpeneseFormShow(false);
  };

  return (
    <Fragment>
      <section className={styles["budget-container"]}>
        <div className={styles["budget-summary"]}>
          <div className={styles["budget-title"]}>
            <h1>{budgetData.title}</h1>
          </div>
          <div className={styles["budget-detail__amounts"]}>
            <p>Consumido</p>
            <h3>₡{budgetData.budgetAmountUsed}</h3>
            <p>Disponible</p>
            <h3>₡{budgetData.budgetAmountAvailable}</h3>
          </div>
          <div className={styles["budget-detail__records"]}>
            <p>Rubros</p>
            <h3>{budgetData.expenseCount}</h3>
          </div>
        </div>

        <div>
          {budgetData.expenseCount > 0 && (
            <ExpenseList list={budgetData.expenseList} />
          )}

          <div className={styles["budget-details__Empty"]}>
            {budgetData.expenseCount == 0 && (
              <p>No has registrado movimientos. Agrega uno para comenzar!</p>
            )}
            <div className={styles["fixed-actions"]}>
              {" "}
              <Button
                onClick={showFormHandler}
                alt="agregar"
                formValidity={true}
              >
                <AddExpenseIcon />{" "}
              </Button>
            </div>

            {expenseFormShow && (
              <ExpenseForm
                userId={budgetData.userId}
                budgetId={budgetData._id}
                hideFormHandler={hideFormHandler}
              ></ExpenseForm>
            )}
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default BudgetDetail;
