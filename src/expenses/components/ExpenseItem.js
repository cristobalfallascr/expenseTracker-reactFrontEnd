import React, { Fragment, useState } from "react";

import { motion } from "framer-motion/dist/framer-motion";
import { AnimatePresence } from "framer-motion/dist/framer-motion";
import styles from "./ExpenseItem.module.css";


import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import ViewListIcon from '@mui/icons-material/ViewList';
const ExpenseItem = (props) => {
  // console.log(styles);
  const [display, setDisplay] = useState("none");
  const [isExpanded, setIsExpanded] = useState(false);

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

  ////Animations here
  const itemVariants = {
    initial: {
      border: "none",
    },
    selected: {
      border: "1px solid white",
    },
  };

  return (
    <Fragment>
      <motion.div
      onMouseLeave={leaveHandler} 
        className={styles["expense-item"]}
        whileTap={{ scale: 1.1 }}
        whileHover={{ scale: 1.1, bordeColor: "#fff" }}
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
            <p className={styles[("expense-item-initial", "C")]}>C</p>
            <p>₡ {props.item.usedAmount}</p>
          </div>
          <div className={styles["expense-item-detail-row"]}>
            <p className={styles[("expense-item-initial", "P")]}>P</p>
            <p>₡ {props.item.budgetedAmount}</p>
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
        </motion.div>

        <div className={styles["expense-expand"]}>
          <motion.h1
            className={styles.title}
            onClick={clickHandler}
            animate={{
              rotate: isExpanded ? 180 : 0,
              color: isExpanded ? "#2FBF71" : "",
            }}
            transition={{
              stiffnes: 100,
              bounce: 100,
            }}
          >
            <ExpandMoreIcon />
          </motion.h1>
        </div>
      </motion.div>
    </Fragment>
  );
};

export default ExpenseItem;
