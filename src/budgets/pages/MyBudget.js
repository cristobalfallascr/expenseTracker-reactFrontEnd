import React, { Fragment, useState } from "react";
import AddExpenseIcon from '@mui/icons-material/AddBusiness';

import styles from "./MyBudget.module.css";

import Input from "../../shared/Components/Input";
import ExpenseForm from "../../budgets/NewExpense/NewExpenseForm"

import ExpenseList from "../../expenses/components/ExpenseList";
import Button from "../../shared/Components/Button";

const MyBudget = (props) => {
  const [budgetCode, setBudgetCode] = useState("");
  const [isloading, setIsLoading] = useState(false);
  const [budgetData, setBudgetData] = useState(null);
  const [isLoaded, setisLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [isButtonActive, setButtonIsActive] = useState(false);
  const [inputTouched, setInputTouched] = useState(false)
  const [inputIsValid, setInputIsValid] = useState(false);

  const formValidity = !inputIsValid && inputTouched
 
  const handleInputChange = (event) => {
    setBudgetCode(event.target.value);
    if(budgetCode.length >=4){
      setInputIsValid(true)
    }
  };

  const fetchBudget = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "http://172.21.98.69:8080/budgets/my-budget/" + budgetCode
      );

      const jsonData = await response.json();
      if (!response.ok) {
        console.log(response);
        throw new Error(
          "No encontramos un presupuesto con el código ingresado. Intenta con uno distinto."
        );
      }

      setBudgetData(jsonData.budget);
    } catch (error) {
      setError(error);
    }
    setisLoaded(true);
    setIsLoading(false);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    if (budgetCode.length < 4) {
      setInputIsValid(false)
      setInputTouched(true)
      return;
    }
    setInputTouched(true)
    setButtonIsActive(true);
    setInputIsValid(true);
    fetchBudget();
  };

  return (
    <Fragment>
      <section className={styles["budget-container"]}>
        {!budgetData && (
          <div className={styles["budget-actions"]}>
            <form onSubmit={formSubmitHandler}>
              <Input
                name="budgetCode"
                onChange={handleInputChange}
                inputType="input"
                type="text"
                placeholder="Digita tu código"
                formValidity={formValidity}
                value={budgetCode}
              ></Input>
              {formValidity && (
                <p className={styles["error-text"]}>
                  El código debe contener al menos 4 caracteres.
                </p>
              )}

              <Button
                buttonIsEnabled={formValidity}

                type="submit"
              >
                Acceder
              </Button>
            </form>
            {error && <p>{error.message}</p>}
            {isloading && <p>...Cargando datos</p>}
          </div>
        )}

        {!isloading && budgetData && (
          <div>
            <div className={styles["budget-title"]}>
              <h1>{budgetData.title}</h1>
            </div>
            <div className={styles["budget-details"]}>
              <p>Inicial {budgetData.budgetAmountAvailable}</p>
              <p>Asignado {budgetData.budgetAmountAssigned}</p>
              <p>Consumido {budgetData.budgetAmountUsed}</p>
              <p>Disponible {budgetData.budgetAmountAvailable}</p>
              <p>Rubros {budgetData.expenseCount}</p>
            </div>
            <div>
              {budgetData.expenseCount > 0 && (
                <ExpenseList list={budgetData.ExpenseList} />
              )}
              {budgetData.expenseCount == 0 && (
                <div className={styles["budget-details__Empty"]}>
                  <p>No has registrado ningun gasto o transaccion. Agrega una para comenzar!</p>
                  <Button alt='agregar'><AddExpenseIcon/> </Button>
                  <ExpenseForm></ExpenseForm>
                  

                </div>
              )}
            </div>
          </div>
        )}
      </section>
    </Fragment>
  );
};

export default MyBudget;
