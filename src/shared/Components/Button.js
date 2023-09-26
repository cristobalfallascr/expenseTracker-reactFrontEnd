import React from "react";

import styles from "./Button.module.css";

const Button = (props) => {
  return (
    <button
      type={props.type}
      // className={styles[("button", "button__Invalid")]}
      className={`${styles["button"]} ${
        styles[props.buttonIsEnabled ? "button__Invalid" : ""]
      }`}
      onClick={props.onClick}
      disabled={props.buttonStatus}
    >
      {props.children}
    </button>
  );
};

export default Button;
