import React from "react";
import styles from "./Title.module.css";

/*
    Study Form 페이지의 타이틀 명
    type
    ㄴ create : 스터디 만들기
    ㄴ modify : 스터디 수정
  */

const Title = ({ type }) => {
  return (
    <h2 className={styles.formTitle}>
      {type === "modify" ? "스터디 수정" : "스터디 만들기"}
    </h2>
  );
};

export default Title;
