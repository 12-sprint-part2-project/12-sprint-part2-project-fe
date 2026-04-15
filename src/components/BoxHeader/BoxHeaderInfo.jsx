import React, { useEffect, useState } from "react";
import styles from "./BoxHeaderInfo.module.css";
import Tag from "../Tag/Tag";

const TITLE = {
  point: "현재까지 획득한 포인트",
  time: "현재 시간",
};

const BoxHeaderInfo = ({ type = "", title = null, info = null }) => {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    if (type !== "time") return; // type 이 time 인 경우에만 useEffect 실행

    const format = (date) => {
      const yyyy = date.getFullYear();
      const mm = String(date.getMonth() + 1).padStart(2, "0");
      const dd = String(date.getDate()).padStart(2, "0");
      const hours = date.getHours();
      const meridiem = hours >= 12 ? "오후" : "오전";
      const h = hours % 12 || 12;
      const i = String(date.getMinutes()).padStart(2, "0");

      return `${yyyy}-${mm}-${dd} ${meridiem} ${h}:${i}`;
    };
    setCurrentTime(format(new Date()));

    const timer = setInterval(() => setCurrentTime(format(new Date())), 1000);
    return () => clearInterval(timer);
  }, [type]);

  const displayTitle = title ?? TITLE[type];
  const displayInfo =
    {
      "": info,
      point: <Tag type={type} theme="light" variant="general" points={info} />,
      time: <span className={styles.curTime}>{currentTime}</span>,
    }[type] ?? info;

  return (
    <div className={styles.boxHeaderInfo}>
      <p className={styles.title}>{displayTitle}</p>
      <div className={styles.info}>{displayInfo}</div>
    </div>
  );
};

export default BoxHeaderInfo;
