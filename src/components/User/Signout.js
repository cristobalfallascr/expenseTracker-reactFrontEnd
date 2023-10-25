import { redirect } from "react-router-dom";

export function action() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("expirationDate");
  return redirect("/auth?mode=login");
}
