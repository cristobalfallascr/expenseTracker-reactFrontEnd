import React, { Fragment, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";



import { getAuthToken } from "../../util/authToken";

import Modal from "../Shared/Modal";

import Fab from "@mui/material/Fab";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

import styles from "./TransactionDetail.module.css";

const TransactionDetail = (props) => {
  const transformedData = [];
  const [transactions, setTransactions] = useState();
  const [expenseDetail, setExpenseDetail] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const params = useParams();

  useEffect(() => {
    const fecthData = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND}/budgets/get-expense/${props.expenseId}`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + getAuthToken(),
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setExpenseDetail(data.expense);
        data.expense.transactionList.map((transaction) => {
          const formattedDate = new Date(
            transaction.createdAt
          ).toLocaleDateString();
          const obj = {
            transactionDate: formattedDate,
            title: transaction.title,
            usedAmount: transaction.usedAmount,
          };
          transformedData.push(obj);
        });
        setTransactions(transformedData);
        setIsLoading(false);
      }
    };

    fecthData();
  }, []);
  console.log(expenseDetail);
  console.log(transactions);
  return (
    <Modal onBackdropClick={props.hideFormHandler}>
      <section className={styles.container}>
        <h1>Registros para {props.title}</h1>
        {isLoading ? (
          <p>Cargando...</p>
        ) : (
          <div>
            <h3>Asignado ₡ {expenseDetail.budgetedAmount}</h3>
            {transactions.length === 0 ? (
              "Aun no hay registros o transacciones"
            ) : (
              <div>
                <table>
                  <thead>
                    <tr className={styles.tableHeader}>
                      <th>Fecha</th>
                      <th>Comercio</th>
                      <th>Monto</th>
                    </tr>
                  </thead>

                  {transactions.map((transaction) => (
                    <tr key={transaction._id}>
                      <td>{transaction.transactionDate}</td>
                      <td>{transaction.title}</td>
                      <td>₡ {transaction.usedAmount}</td>
                    </tr>
                  ))}
                  <tr>
                    <td></td>
                    <td className={styles.tableHeader}>Total utilizado</td>
                    <td>₡ {expenseDetail.usedAmount}</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td className={styles.tableHeader}>Diferencia</td>
                    <td>
                      ₡{" "}
                      {expenseDetail.budgetedAmount - expenseDetail.usedAmount}
                    </td>
                  </tr>
                </table>
              </div>
            )}

            <div className={styles.actions}>
              <Fab FabClases={styles.test}
                color="warning"
                aria-label="Cerrar"
                size="small"
                onClick={props.hideFormHandler}
              >
                <HighlightOffIcon />
              </Fab>
            </div>
          </div>
        )}
      </section>
    </Modal>
  );
};

export default TransactionDetail;

export async function action({ params }) {
  console.log(params);
}
