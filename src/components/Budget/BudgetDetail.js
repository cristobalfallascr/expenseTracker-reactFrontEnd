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
  console.log(isExpanded);
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
          <div className={styles["budget-title"]}>
            <h1>{budgetData.title}</h1>
          </div>
          <div className={styles.amountContainer}>
            <div className={styles["budget-detail__amounts"]}>
              <p>Inicial</p>
              <h3>₡{budgetData.budgetTotalAmount}</h3>
              <p>Sin asignar</p>
              <h3>₡{budgetData.budgetAmountUnassigned}</h3>
            </div>
            <div className={styles["budget-detail__amounts"]}>
              <p>Consumido</p>
              <h3>₡{budgetData.budgetAmountUsed}</h3>
              <p>Disponible</p>
              <h3>₡{budgetData.budgetAmountAvailable}</h3>
            </div>
          </div>
        </div>
        <div className={styles["actions-container"]}>
          <p>Accciones</p>

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
          <motion.div
            animate={{
              rotate: isExpanded ? 180 : 0,
              color: isExpanded ? "#2FBF71" : "",
            }}
            transition={{
              stiffnes: 100,
              bounce: 100,
            }}
            className={styles["expand-actions"]}
            onClick={clickHandler}
          >
            <ExpandMoreIcon />
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
