import React, { useState, useEffect } from "react";
import {
  createBrowserRouter as Router,
  RouterProvider,
} from "react-router-dom";

import NewExpense, {
  action as newExpenseAction,
} from "./components/Expense/NewExpense";

import NewTransaction, {
  action as newTransactionAction,
} from "./components/Transaction/NewTransaction";
import Budget, { budgetLoader } from "./pages/BudgetPage";
import HomePage from "./pages/HomepPage";
import BasicRootPage from "./pages/BasicRootPage";
import ErrorPage from "./pages/ErrorPage";
import Auth, { action as authAction } from "./pages/AuthPage";
import User, { userLoader } from "./pages/UserPage";
import Signout, { action as logoutAction } from "./components/User/Signout";
import TransactionDetail from "./components/Transaction/TransactionDetail";

const router = Router([
  {
    path: "/",
    element: <BasicRootPage />,
    errorElement: <ErrorPage />,
    children: [
      { path: "", index: true, element: <HomePage /> },
      { path: "auth", element: <Auth />, action: authAction },
    ],
  },

  {
    path: "/user",
    element: <BasicRootPage />,
    errorElement: <ErrorPage />,
    children: [
      { path: ":userId", element: <User />, loader: userLoader },
      {
        path: ":userId/budgets/:budgetId",
        element: <Budget />,
        loader: budgetLoader,
      },
      {
        path: ":userId/budgets/:budgetId/new",
        element: <NewExpense />,
        action: newExpenseAction,
      },
      {
        path: ":userId/budgets/:budgetId/add-transaction",
        element: <NewTransaction />,
        action: newTransactionAction,
      },
      // {
      //   path: ":userId/budgets/:budgetId/expense/:expenseId",
      //   element: <TransactionDetail />,
      // },
      {
        path: "logout",
        element: <Signout />,
        action: logoutAction,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
