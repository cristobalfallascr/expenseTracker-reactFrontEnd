import React, { useState, useEffect } from "react";
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
import Access from "./budgets/pages/Access";

const App = () => {
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);

  //UseEffect in scenrio with no dependecies
  useEffect(() => {
    const storeLoginData = localStorage.getItem("isLoggedIn");
    if (storeLoginData === "1") {
      setUserIsLoggedIn(true);
    }
  }, []);

  const loginHandler = (token) => {
    localStorage.setItem("token", token);
    setUserIsLoggedIn(true);
  };
  return (
    <div>
      {/* <ExpenseList list={SAMPLEEXPENSE}></ExpenseList> */}
      {/* <HomeContainer>       </HomeContainer> */}
      <Access loginHandler={loginHandler} ></Access>
      <MyBudget token={localStorage.getItem("token")}></MyBudget>
    </div>
  );
};

export default App;
