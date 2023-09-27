import React from "react";

import styles from "./Input.module.css";

const Input = (props) => {
  // const inputClassNames = props.inputStatus ? 'input': ['input input__Invalid']
  return (
    <div>
      {props.inputType === "input" && (
        <input
          name={props.name}
          className={`${styles["input"]} ${
            styles[props.formValidity ? "input__Invalid" : ""]
          }`}
          // className={styles[inputClassNames]}
          type={props.type}
          value={props.value}
          placeholder={props.placeholder}
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
