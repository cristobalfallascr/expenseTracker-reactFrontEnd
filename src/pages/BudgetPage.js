import React from "react";
import { json, useSearchParams, useParams, redirect } from "react-router-dom";

import { getAuthToken } from "../util/authToken";
import BudgetDetail from "../components/Budget/BudgetDetail";

const Budget = () => {
  return <BudgetDetail></BudgetDetail>;
};

export default Budget;

export async function budgetLoader({ params }) {
  const budgetId = params.budgetId;
  const token = getAuthToken();
  if (!token) {
    return redirect("/auth?mode=login");
  } else {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND}/budgets/my-budget/` + budgetId,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    if (!response.ok) {
      throw json({ message: response.statusText }, { status: response.status });
    } else {
      return response;
    }
  }
}
