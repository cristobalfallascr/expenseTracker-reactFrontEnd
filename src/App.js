import React, { useState } from "react";
import { BrowserRouter as Router, Route, json } from "react-router-dom";
import { redirect as Redirect } from "react-router-dom";
import {} from "react-router-dom";

import ExpenseList from "./expenses/components/ExpenseList";
import ExpenseItem from "./expenses/components/ExpenseItem";
import HomeContainer from "./budgets/components/HomeContainer";
import HomeItem from "./budgets/components/HomeItem";
import Users from "./user/pages/Users";

import MyBudget from "./budgets/pages/MyBudget";
import CreateBudget from "./budgets/NewBudget/CreateBudget";
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
  {
    id: Math.random(),
    title: "Mant. Carro",
    payType: "TC",
    date: "12/08/2023",
    amount: 11,
    totalBudget: 100,
    availableBudget: 11,
    usedBudget: 89,
    records: 1,
  },
];

const App = () => {

  return (
    <div>
      {/* <ExpenseList list={SAMPLEEXPENSE}></ExpenseList> */}
      {/* <HomeContainer>       </HomeContainer> */}
      {/* <CreateBudget></CreateBudget> */}
      <MyBudget></MyBudget>
    </div>
  );
};

export default App;
