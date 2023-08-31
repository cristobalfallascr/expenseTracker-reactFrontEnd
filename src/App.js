import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { redirect as Redirect } from "react-router-dom";
import {} from "react-router-dom";

import ExpenseList from "./expenses/components/ExpenseList";
import ExpenseItem from "./expenses/components/ExpenseItem";
import Users from "./user/pages/Users";

const SAMPLEEXPENSE = [
  {
    id: Math.random(),
    title: "Combustibles",
    payType: "TC",
    date: "12/08/2023",
    amount: 17,
    totalBudget: 200,
    availableBudget: 97,
    usedBudget: 103,
    records: 4,
  },
  {
    id: Math.random(),
    title: "Villa Paraiso",
    payType: "Transferencia",
    date: "01/08/2023",
    amount: 325,
    totalBudget: 325,
    availableBudget: 0,
    usedBudget: 325,
    records: 1,
  },
  {
    id: Math.random(),
    title: "Abarrotes",
    payType: "TC",
    date: "08/28/2023",
    amount: 278,
    totalBudget: 450,
    availableBudget: 122,
    usedBudget: 278,
    records: 2,
  },
  {
    id: Math.random(),
    title: "Familia",
    payType: "TC",
    date: "01/08/2023",
    amount: 200,
    totalBudget: 200,
    availableBudget: 90,
    usedBudget: 110,
    records: 3,
  },
];

const App = () => {
  return (
    <div>
      <ExpenseList list={SAMPLEEXPENSE}></ExpenseList>
    </div>
  );
};

export default App;
