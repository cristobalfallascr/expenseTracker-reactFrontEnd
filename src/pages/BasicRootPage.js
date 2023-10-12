import React, { Fragment } from "react";
import { Outlet } from "react-router-dom";

import { getAuthToken } from "../util/authToken";
import NonAuthNavigation from "../components/Shared/NonAuthNavigation";
import MainNavigation from "../components/Shared/MainNavigation";

const BasicRoot = () => {
 
  return (
    <Fragment>
      {getAuthToken() ? (
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
