import React, { Fragment } from "react";
import { useRouteError } from "react-router-dom";
import NonAuthNavigation from "../components/Shared/NonAuthNavigation";
import MainNavigation from "../components/Shared/MainNavigation";
import { getAuthToken } from "../util/authToken";

function ErrorPage() {
  const error = useRouteError();
  console.log(error);

  return (
    <Fragment>
      {getAuthToken() ? (
        <MainNavigation></MainNavigation>
      ) : (
        <NonAuthNavigation></NonAuthNavigation>
      )}
      <main>
        <h3>{error.statusText}</h3>
        <p>
          {" "}
          Intentalo de nuevo o contacta con nosotros si el problema persiste.
          Gracias.{" "}
        </p>
      </main>
    </Fragment>
  );
}

export default ErrorPage;
