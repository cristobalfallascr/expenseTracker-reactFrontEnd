import React from "react";
import { redirect } from "react-router-dom";

const Sigout = () => {

    
    return (
        <div>
            <h1>Sigout</h1>
        </div>
    );

}

export default Sigout;

export  function action() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return redirect("/auth?mode=login");
}
