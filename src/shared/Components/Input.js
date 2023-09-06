import React from "react";

import styles from "./Input.module.css";

const Input = (props) => {
  return (
    <div>
      {props.inputType === "input" && (
        <input
          className={styles.input}
          type={props.type}
          value={props.value}
          onChange={props.onChange}
        >
          {props.children}
        </input>
      )}
      {props.inputType === "textarea" && (
        <textarea
          className=""
          type={props.type}
          value={props.value}
          onChange={props.onChange}
        >
          {props.children}
        </textarea>
      )}
    </div>
  );
};

export default Input;
