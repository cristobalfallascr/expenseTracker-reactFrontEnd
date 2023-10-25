import React, { Fragment, useEffect } from "react";
import { Outlet, useRouteLoaderData, useSubmit } from "react-router-dom";

import NonAuthNavigation from "../components/Shared/NonAuthNavigation";
import MainNavigation from "../components/Shared/MainNavigation";
import { getTokenDuration } from "../util/authToken";

const BasicRoot = () => {
  const token = useRouteLoaderData("user");
  const submit = useSubmit();

  //Set timer to logout
  useEffect(() => {
    if (!token) {
      return;
    }

    if (token === "EXPIRED") {
      submit(null, { method: "post", action: "/user/logout" });
      return;
    }

    const tokenDuration = getTokenDuration();
    console.log(tokenDuration)

    setTimeout(() => {
      submit(null, { method: "post", action: "/user/logout" });
    }, tokenDuration);
  }, [token, submit]);

  return (
    <Fragment>
      {token ? (
        <MainNavigation></MainNavigation>
      ) : (
        <NonAuthNavigation></NonAuthNavigation>
      )}
      <main>
        <Outlet />
      </main>
    </Fragment>
  );
};
export default BasicRoot;
