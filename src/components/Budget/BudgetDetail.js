import React, { Fragment, useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { motion } from "framer-motion/dist/framer-motion";

import AddExpenseIcon from "@mui/icons-material/AddBusiness";
import TuneIcon from "@mui/icons-material/Tune";
import EditNoteIcon from "@mui/icons-material/EditNote";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import ExpenseForm from "../Expense/ExpenseForm";
import ExpenseList from "../Expense/ExpenseList";
import Button from "../Shared/Button";

import styles from "./BudgetDetail.module.css";

const BudgetDetail = (props) => {
  const data = useLoaderData();
  const budgetData = data.budget;

  const [expenseFormShow, setExpeneseFormShow] = useState(false);
  useEffect(() => {
    setExpeneseFormShow(false);
  }, [budgetData.expenseList, budgetData.budgetAmountUsed]);

  const [isExpanded, setIsExpanded] = useState(false);

  const showFormHandler = () => {
    setExpeneseFormShow(true);
  };

  const hideFormHandler = () => {
    setExpeneseFormShow(false);
  };

  const clickHandler = () => {
    if (!isExpanded) {
      setIsExpanded(true);
    } else {
      setIsExpanded(false);
    }
  };

  return (
    <Fragment>
      <section className={styles["budget-container"]}>
        <div className={styles["budget-summary"]}>
          <div className={styles.amountContainer}>
            <div className={styles["budget-title"]}>
              <h1>{budgetData.title}</h1>
              <p>
                Has asignado ₡ {budgetData.budgetAmountAssigned} en distintos
                rubros.{" "}
              </p>
              {budgetData.budgetAmountAssigned > 0 && (
                <p>
                  Disponible ₡{" "}
                  {budgetData.budgetTotalAmount <
                  budgetData.budgetAmountAssigned
                    ? "0"
                    : budgetData.budgetTotalAmount -
                      budgetData.budgetAmountAssigned}
                  <span style={{ color: "#2fbf70" }}> </span>
                </p>
              )}
            </div>
            <div className={styles["budget-detail__amounts"]}>
              <p>Inicial</p>
              <h3>₡{budgetData.budgetTotalAmount}</h3>
              <p>Consumido</p>
              <h3>₡{budgetData.budgetAmountUsed}</h3>
            </div>
          </div>

          {budgetData.budgetTotalAmount < budgetData.budgetAmountAssigned && (
            <p style={{ color: "#ef2d56" }}>
              Te has sobrepasado por ₡
              {budgetData.budgetAmountAssigned - budgetData.budgetTotalAmount}
            </p>
          )}
        </div>
        <div className={styles["actions-container"]}>
          <p>Acciones</p>
          <motion.h1
            className={styles["expand-actions"]}
            onClick={clickHandler}
            animate={{
              rotate: isExpanded ? 180 : 0,
              color: isExpanded ? "#2FBF71" : "",
            }}
          >
            <ExpandMoreIcon />
          </motion.h1>

          <motion.div
            className={styles["fixed-actions"]}
            animate={{
              display: isExpanded ? "flex" : "none",
              opacity: isExpanded ? 1 : 0,
              y: isExpanded ? 0 : -30,
            }}
          >
            <div className={styles["actions"]}>
              <p>Agregar</p>
              <Button
                onClick={showFormHandler}
                alt="agregar"
                formValidity={true}
              >
                <AddExpenseIcon />{" "}
              </Button>
            </div>

            <div className={styles["actions"]}>
              <p>Editar</p>
              <Button alt="agregar" formValidity={false}>
                <EditNoteIcon />{" "}
              </Button>
            </div>
            <div className={styles["actions"]}>
              <p>Filtrar</p>
              <Button alt="agregar" formValidity={false}>
                <TuneIcon />{" "}
              </Button>
            </div>
          </motion.div>
        </div>

        <div>
          {budgetData.expenseCount > 0 && (
            <ExpenseList list={budgetData.expenseList} />
          )}

          <div className={styles["budget-details__Empty"]}>
            {budgetData.expenseCount == 0 && (
              <p>No has registrado movimientos. Agrega uno para comenzar!</p>
            )}

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
