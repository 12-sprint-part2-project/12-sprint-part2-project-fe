import React from "react";
import styles from "./Tag.module.css";
import pointIcon from "../../assets/images/ic-point.svg";

export const Tag = ({
  type,
  theme,
  variant = "default",
  points,
  count,
  emojiIcon,
}) => {
  const config = {
    point: {
      icon: <img src={pointIcon} alt="point" />,
      text: `${points}P 획득`,
    },
    emoji: {
      icon: <span>{emojiIcon}</span>,
      text: count,
    },
  };

  return (
    <div
      className={`
        ${styles.tag}
        ${styles[`tag-${type}`]}
        ${styles[`tag-${theme}`]}
        ${variant === "general" ? styles[`tag-${type}-general`] : ""}
      `}
    >
      <div
        className={`
          ${styles.content}
          ${styles[`content-${type}`]}
        `}
      >
        <span
          className={`
            ${styles.icon}
            ${styles[`icon-${type}`]} 
            ${variant === "general" ? styles[`icon-${type}-general`] : ""}
          `}
        >
          {config[type].icon}
        </span>

        <span
          className={`
            ${styles.text}
            ${styles[`text-${theme}`]}
            ${styles[`text-${type}`]}
            ${variant === "general" ? styles[`text-general`] : ""}
            ${
              type === "point" && variant === "general"
                ? styles[`text-point-general`]
                : ""
            }
          `}
        >
          {config[type].text}
        </span>
      </div>
    </div>
  );
};
