import React from "react";
import styles from "./HomeItem.module.css";
import HomeItem from "./HomeItem";

import image1 from "./img1.jpg";
import image2 from "./img2.jpg";
import image3 from "./img3.jpg";

const SAMPLEMENU = [
  { title: "Proyectos", image: image1 },
  { title: "Trabajemos Juntos", image: image2 },
  { title: "Sobre Nosotros", image: image3 },
  { title: "Testimonios", image: "https://images.unsplash.com/photo-1522444195799-478538b28823?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80" },
];

const HomeContainer = () => {
  return (
    <div className={styles.container}>
      {SAMPLEMENU.map((item) => {
        return <HomeItem menuItem={item}></HomeItem>;
      })}
    </div>
  );
};

export default HomeContainer;
