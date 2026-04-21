import React from "react";
import styles from "./Title.module.css";

const Title = ({ type }) => {
  return (
    <h2 className={styles.formTitle}>
      {type === "modify" ? "스터디 수정" : "스터디 만들기"}
    </h2>
  );
};

export default Title;
