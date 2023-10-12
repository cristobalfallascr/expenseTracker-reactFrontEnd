import React, { Fragment, useState } from "react";
import { useLoaderData, Link, json } from "react-router-dom";
import { getAuthToken } from "../util/authToken";
import Modal from "../components/Shared/Modal";
import CreateBudget from "../components/Budget/CreateBudget";

import styles from "./UserPage.module.css";
const User = () => {
  const data = useLoaderData();
  const userData = data.user;
  const [createBudgetFormShow, setCreateBudgetFormShow] = useState(false);

  const showFormHandler = () => {
    setCreateBudgetFormShow(true);
  };
  const hideFormHandler = () => {
    setCreateBudgetFormShow(false);
  };

  return (
    <Fragment>
      <main>
        {userData.budgetList.length === 0 ? (
          <div>
            <p>Hola {userData.name}! No has agregado ningun presupuesto</p>
            {createBudgetFormShow && (
              <Modal onBackdropClick={hideFormHandler}>
                <CreateBudget></CreateBudget>
              </Modal>
            )}
            <p>
              Crea tu primer presupuesto{" "}
              <span onClick={showFormHandler}>aquí!.</span>
            </p>
          </div>
        ) : (
          <div>
            <p>Hola {userData.name}! estos son tus presupuestos:</p>
            <ul>
              {userData.budgetList.map((budget) => {
                return (
                  <li key={budget._id}>
                    <Link to={`budgets/${budget._id}`}>{budget.title}</Link>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </main>
    </Fragment>
  );
};

export default User;

export async function userLoader({ params }) {
  const userId = params.userId;
  const response = await fetch(
    `${process.env.REACT_APP_BACKEND}/users/${userId}`,
    {
      headers: {
        Authorization: "Bearer " + getAuthToken(),
      },
    }
  );
  if (!response.ok) {
    throw json({ message: response.statusText }, { status: response.status });
  } else {
    return response;
  }
}
