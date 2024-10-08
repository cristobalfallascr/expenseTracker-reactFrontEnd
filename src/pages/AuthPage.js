import React from "react";
import { json, redirect } from "react-router-dom";
import { setAuthToken } from "../util/authToken";
import AuthForm from "../components/Authentication/AuthForm";

function Auth() {
  return <AuthForm />;
}

export default Auth;

export async function action({ request }) {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get("mode") || "login";

  if (mode !== "login" && mode !== "signup") {
    throw json({ message: "Invalid mode" }, { status: 422 });
  }

  const data = await request.formData();

  const authData = {
    email: data.get("email"),
    password: data.get("password"),
    name: data.get("name") || undefined,
  };
  const response = await fetch(
    `${process.env.REACT_APP_BACKEND}/auth/` + mode,
    {
      method: "POST",
      body: JSON.stringify(authData),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (response.status === 401 || response.status === 422) {
    return response;
  }
  if (!response.ok) {
    throw json({ message: "Invalid credentials" }, { status: 500 });
  }

  const resData = await response.json();
  const token = resData.token;

  if (mode === "login") {
    localStorage.setItem("user", resData.userId);
    localStorage.setItem("token", token);
    const expirationDate = new Date()
    expirationDate.setHours(expirationDate.getHours() + 1)
    localStorage.setItem("expirationDate", expirationDate);
  }
  return redirect(`/user/${resData.userId}`);

  
}
