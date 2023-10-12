import React from "react";
import { redirect,  json } from "react-router-dom";

import { getAuthToken } from "../../util/authToken";
const NewExpense = (props) => {
  return <p>No hay nada en esta pagina!</p>;
};

export default NewExpense;

export async function action({ request, params }) {
  const redirectUlr = `/user/${params.userId}/budgets/${params.budgetId}`;

  const data = await request.formData();
  
  const newTransaction = {
    title: data.get("title"),
    usedAmount: data.get("usedAmount"),
    type: data.get("type"),
    expenseId: data.get("expenseId"),
    budgetId: params.budgetId,
    userId: params.userId,
  };
  console.log(newTransaction);
  const response = await fetch(
    `${process.env.REACT_APP_BACKEND}/budgets/add-transaction`,
    {
      method: "POST",
      body: JSON.stringify(newTransaction),
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
        "Content-Type": "application/json",
      },
    }
  );
  if (!response.ok) {
    throw json({ message: response.statusText }, { status: response.status });
  }
  return redirect(redirectUlr);
}
