import React from "react";
import image from "./img1.jpg";
import styles from "./HomeItem.module.css";

const HomeItem = (props) => {
    console.log(props.menuItem.title)
  return (
    <div>
      <div className={styles["item-container"]}>
        <img
          src={props.menuItem.image}
          alt={props.menuItem.title}
          className={styles["item-image"]}
        ></img>
      </div>
      <h1 className={styles.title}>{props.menuItem.title}</h1>
    </div>
  );
};
export default HomeItem;
