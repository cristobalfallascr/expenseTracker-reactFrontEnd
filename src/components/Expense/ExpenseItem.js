import React, { Fragment, useState } from "react";
import { useParams, useSubmit } from "react-router-dom";
import { motion } from "framer-motion/dist/framer-motion";

import styles from "./ExpenseItem.module.css";
import TransactionForm from "../Transaction/TransactionForm";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import ViewListIcon from "@mui/icons-material/ViewList";
import SetPaid from "@mui/icons-material/CreditScore";

import { Fab } from "@mui/material";

const ExpenseItem = (props) => {
  const submit = useSubmit();

  const params = useParams();
  const newTransactionActionUrl = `/user/${params.userId}/budgets/${params.budgetId}/add-transaction`;
  const [display, setDisplay] = useState("none");
  const [isExpanded, setIsExpanded] = useState(false);
  const [transctionFormShow, setTransactioFormShow] = useState(false);

  const transctionFormShowHandler = () => {
    setTransactioFormShow(true);
  };

  const hideFormHandler = () => {
    setTransactioFormShow(false);
  };

  const clickHandler = (event) => {
    if (!isExpanded) {
      setIsExpanded(true);
    } else {
      setIsExpanded(false);
    }
  };

  const leaveHandler = (event) => {
    setIsExpanded(false);
  };

  const expenseColor = () => {
    if (props.item.availableAmount === 0) {
      return "#363537";
    }
    if (
      props.item.availableAmount < props.item.budgetedAmount * 0.3 &&
      props.item.availableAmount > 0
    ) {
      return "#ECA72C";
    }
    if (props.item.availableAmount < 0) {
      return "#EF2D56";
    }
  };

  // Function to set expense to 100%paid
  const setPaidHandler = () => {
    const proceed = window.confirm("Marcar este rubro como pagado?");
    if (proceed) {
      //submit hook allows to submit programatically instead of the Form hook
      submit(
        {
          title: "Pago completo",
          usedAmount: props.item.availableAmount,
          expenseId: props.item._id,
          budgetId: props.item.budgetId,
          type: props.item.title,
        },
        {
          method: "POST",
          action: newTransactionActionUrl,
        }
      );
    }
  };

  return (
    <Fragment>
      <motion.div
        onMouseLeave={leaveHandler}
        className={styles["expense-item"]}
        animate={{
          width: isExpanded ? "50%" : "40%",
          border: isExpanded ? "1px solid #fff" : "none",
          backgroundColor: expenseColor(),
        }}
        transition={{
          stiffnes: 100,
          bounce: 100,
        }}
        // whileTap={{ scale: 1.1 }}
        whileHover={{ border: "1px  solid #fff" }}
      >
        <div className={styles["expense-item-title"]}>
          <h1 className={styles.title}>{props.item.title}</h1>
        </div>
        <div className={styles["expense-item-row"]}>
          <p className={styles[("expense-item-initial", "D")]}>D</p>
          <p>₡{props.item.availableAmount}</p>
        </div>

        <motion.div
          className={`${styles["expense-item-details"]} ${
            styles[isExpanded ? "expanded" : ""]
          }`}
          animate={{
            display: isExpanded ? "block" : "none",
            opacity: isExpanded ? 1 : 0,
            y: isExpanded ? 0 : -30,
          }}
        >
          <div className={styles["expense-item-detail-row"]}>
            <p className={styles[("expense-item-initial", "P")]}>A</p>
            <p>₡ {props.item.budgetedAmount}</p>
          </div>

          <div className={styles["expense-item-detail-row"]}>
            <p className={styles[("expense-item-initial", "C")]}>U</p>
            <p>₡ {props.item.usedAmount}</p>
          </div>

          <div className={styles["expense-item-detail-row"]}>
            <p className={styles[("expense-item-initial", "R")]}>R</p>
            <p>{props.item.transactions}</p>
          </div>

          <div className={styles["expense-item-actions"]}>
            <motion.button
              className={styles["expense-item-button"]}
              whileTap={{ scale: 1.1 }}
              whileHover={{ scale: 1.1, color: "rgb(255, 217, 47)" }}
              onClick={transctionFormShowHandler}
            >
              <AddBusinessIcon />
            </motion.button>
            <motion.button
              className={styles["expense-item-button"]}
              whileTap={{ scale: 1.1 }}
              whileHover={{ scale: 1.1, color: "rgb(255, 217, 47)" }}
            >
              <ViewListIcon />
            </motion.button>
          </div>
          {transctionFormShow && (
            <TransactionForm
              type={props.item.title}
              budgetId={props.item.budgetId}
              expenseId={props.item._id}
              hideFormHandler={hideFormHandler}
              submittedExpenseHandler={props.submittedExpenseHandler}
            ></TransactionForm>
          )}
        </motion.div>

        <div className={styles["expense-expand"]}>
          <motion.h1
            className={styles.title}
            onClick={clickHandler}
            animate={{
              rotate: isExpanded ? 180 : 0,
              color: isExpanded ? "#fff" : "",
            }}
            transition={{
              stiffnes: 100,
              bounce: 100,
            }}
          >
            <ExpandMoreIcon />
          </motion.h1>
          {props.item.type === "Servicios Publicos" &&
            props.item.availableAmount > 0 && (
              <motion.div
                className={styles.setpaid}
                animate={{
                  display: isExpanded ? "none" : "block",
                }}
                onClick={setPaidHandler}
              >
                <Fab size="small" color="warning" type="submit">
                  <SetPaid />
                </Fab>
              </motion.div>
            )}
        </div>
      </motion.div>
    </Fragment>
  );
};

export default ExpenseItem;

export async function action(params) {}
