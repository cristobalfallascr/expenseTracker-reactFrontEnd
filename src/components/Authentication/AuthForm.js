import React, { Fragment, useEffect, useState } from "react";

import {
  useSearchParams,
  Link,
  Form,
  useActionData,
  useNavigation,
} from "react-router-dom";

import Input from "../Shared/Input";
import Button from "../Shared/Button";

import styles from "./AuthForm.module.css";

const AuthForm = (props) => {
  //////////////////////////Consts
  const data = useActionData();
  const navigation = useNavigation();
  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get("mode") === "login";
  const isSubmitting = navigation.state === "submitting";
 
  /////////////////////////Managing State
  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
    name: "",
  });

  const [nameValidity, setNameValidity] = useState(true);
  const [emailValidity, setEmailValidity] = useState(true);
  const [passwordValidity, setPasswordValidity] = useState(true);
  const [formValidity, setFormValidity] = useState(null);

  useEffect(() => {
    const timerIdentifier = setTimeout(() => {
      if (isLogin) {
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

  return (
    <Fragment>
      <Form method="post" className={styles["form-container"]}>
        <h2 className={styles.title}>
          {isLogin ? "Iniciar Sesión" : "Registrarse"}
        </h2>

        {!isLogin && (
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
          {data && data.errors && (
            <ul>
              {Object.values(data.errors).map((err) => (
                <li  key={err.msg}> <p className={styles.warning}>{err.msg}</p></li>
              ))}
            </ul>
          )}
          {data && data.message &&  <p className={styles.warning}>{data.message}</p>}
          <Button
            onClick={props.loginHandler}
            type="submit"
            formValidity={formValidity}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Enviando..." : "Iniciar"}
          </Button>
        </div>
        <div className={styles["form-control"]}>
          <p>
            {isLogin ? "¿No tienes una cuenta?" : "¿Ya tienes una cuenta?"}
            <span>
              <Link to={`?mode=${isLogin ? "signup" : "login"}`}>
                {isLogin ? " Registrarse" : " Iniciar Sesión"}
              </Link>
            </span>
          </p>
        </div>
      </Form>
    </Fragment>
  );
};
export default AuthForm;
