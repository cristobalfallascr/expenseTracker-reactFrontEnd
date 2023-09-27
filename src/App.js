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



const App = () => {

  return (
    <div>
      {/* <ExpenseList list={SAMPLEEXPENSE}></ExpenseList> */}
      {/* <HomeContainer>       </HomeContainer> */}
      
      <MyBudget></MyBudget>
      
    </div>
  );
};

export default App;
