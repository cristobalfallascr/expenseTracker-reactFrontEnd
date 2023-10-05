import React, { Fragment, useEffect, useState } from "react";
import Input from "../../shared/Components/Input";
import ExpenseList from "../../expenses/components/ExpenseList";
import Button from "../../shared/Components/Button";
import Modal from "../../shared/Components/Modal";

import styles from "./Access.module.css";

//CONSTS
const SU_URI = "http://172.21.98.69:8080/auth/signup";
const SI_URI = "http://172.21.98.69:8080/auth/login";

const Access = (props) => {
  /////////////////////////Managing State
  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
    name: "",
  });

  const [signMode, setSignMode] = useState("login");
  const [nameValidity, setNameValidity] = useState(true);
  const [emailValidity, setEmailValidity] = useState(true);
  const [passwordValidity, setPasswordValidity] = useState(true);
  const [formValidity, setFormValidity] = useState(null);

  useEffect(() => {
    const timerIdentifier = setTimeout(() => {
      if (signMode === "login") {
        setFormValidity(
          userInput.email.includes("@") && userInput.password.trim().length > 6
        );
      } else {
        setFormValidity(
          userInput.email.includes("@") &&
            userInput.password.trim().length > 6 &&
            userInput.name.trim().length > 3
        );
      }
    }, 500);
    //This is a cleanup function
    return () => {
      clearTimeout(timerIdentifier);
    };
  }, [userInput.email, userInput.password, userInput.name]);

  /////////////////////////Change Handlers
  const signModeHandler = () => {
    setSignMode((prevState) => {
      return prevState === "login" ? "signup" : "login";
    });
  };

  const userNameChangeHandler = (event) => {
    setUserInput((prevState) => {
      return { ...prevState, name: event.target.value };
    });
    setNameValidity(event.target.value.trim().length >= 3);
  };

  const emailChangeHandler = (event) => {
    setUserInput((prevState) => {
      return { ...prevState, email: event.target.value };
    });
    setEmailValidity(event.target.value.includes("@"));
  };

  const passwordChangeHandler = (event) => {
    setUserInput((prevState) => {
      return { ...prevState, password: event.target.value };
    });
    setPasswordValidity(event.target.value.trim().length > 6);
  };

  /////////////////////////Form Handlers
  const accessFormSubmitHandler = async (event) => {
    event.preventDefault();
    if (signMode === "signup") {
      const response = await fetch(SU_URI, {
        method: "POST",
        body: JSON.stringify(userInput),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const responseData = await response.json();
      console.log(responseData);
      setUserInput({ email: "", password: "", name: "" });
      setSignMode("login");
      alert(responseData.message);
    } else {
      const response = await fetch(SI_URI, {
        method: "POST",
        body: JSON.stringify(userInput),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if(!response.ok){
        console.log("Invalid!!!!")
      }
      const responseData = await response.json();
      console.log(responseData);
      setUserInput({ email: "", password: "" });
      props.loginHandler(responseData.token);
      alert(responseData.message);
    }
  };

  return (
    <Fragment>
      <section className={styles["form-container"]}>
        <h2 className={styles.title}>
          {signMode === "login" ? "Iniciar Sesión" : "Registrarse"}
        </h2>

        <form onSubmit={accessFormSubmitHandler}>
          {signMode === "signup" && (
            <div className={styles["form-control"]}>
              <Input
                name="name"
                inputType="input"
                type="text"
                placeholder="Nombre"
                value={userInput.name}
                onChange={userNameChangeHandler}
                formValidity={nameValidity}
              ></Input>
              {nameValidity === false && (
                <p className={styles.warning}>
                  El nombre de contener al menos 3 caracteres
                </p>
              )}
            </div>
          )}
          <div className={styles["form-control"]}>
            <Input
              name="email"
              inputType="input"
              type="text"
              placeholder="Correo electrónico "
              value={userInput.email}
              onChange={emailChangeHandler}
              formValidity={emailValidity}
            />
            {emailValidity === false && (
              <p className={styles.warning}>
                Ingresa un correo valido nombre@dominio.com
              </p>
            )}
          </div>
          <div className={styles["form-control"]}>
            <Input
              name="password"
              inputType="input"
              type="password"
              placeholder="Contraseña"
              value={userInput.password}
              onChange={passwordChangeHandler}
              formValidity={passwordValidity}
            ></Input>
            {passwordValidity === false && (
              <p className={styles.warning}>
                La contraseña debe contener al menos 6 caracteres
              </p>
            )}
          </div>
          <div className={styles["form-control"]}>
            <Button
              onClick={props.loginHandler}
              type="submit"
              formValidity={formValidity}
            >
              {signMode === "login" ? "Iniciar Sesión" : "Registrarse"}
            </Button>
          </div>
          <div className={styles["form-control"]}>
            <p>
              {signMode === "login"
                ? "¿No tienes una cuenta?"
                : "¿Ya tienes una cuenta?"}
              <span className={styles.link} onClick={signModeHandler}>
                {signMode === "login" ? " Registrarse" : " Iniciar Sesión"}
              </span>
            </p>
          </div>
        </form>
      </section>
    </Fragment>
  );
};

export default Access;
