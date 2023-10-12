import React from "react";
import { json, useSearchParams, useParams } from "react-router-dom";

import { getAuthToken } from "../util/authToken";
import BudgetDetail from "../components/Budget/BudgetDetail";

const Budget = () => {

  return <BudgetDetail></BudgetDetail>;
};

export default Budget;

export async function budgetLoader({ params }) {
  const budgetId = params.budgetId;

  const response = await fetch(
    `${process.env.REACT_APP_BACKEND}/budgets/my-budget/` + budgetId,
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
