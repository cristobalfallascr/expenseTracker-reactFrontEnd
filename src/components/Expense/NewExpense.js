import React from "react";
import { redirect,  json } from "react-router-dom";

import { getAuthToken } from "../../util/authToken";
const NewExpense = (props) => {
  return <p>No hay nada en esta pagina!</p>;
};

export default NewExpense;

export async function action({ request, params }) {
  const redirectUrl = "/user/" + params.userId + "/budgets/" + params.budgetId;

  const data = await request.formData();
  const newExpense = {
    title: data.get("title"),
    type: data.get("type"),
    budgetedAmount: data.get("budgetedAmount"),
    budgetId: params.budgetId,
    userId: params.userId,
  };

  const response = await fetch(
    `${process.env.REACT_APP_BACKEND}/budgets/add-expense`,
    {
      method: "POST",
      body: JSON.stringify(newExpense),
      headers: {
        Authorization: "Bearer " + getAuthToken(),
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw json({ message: response.statusText }, { status: response.status });
  } else {
    return redirect(redirectUrl);
  }
}
