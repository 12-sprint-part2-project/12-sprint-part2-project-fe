import React from "react";
import styles from "./Tag.module.css";
import "../../styles/global/icon.css";

const Tag = ({
  type,
  theme,
  variant = "default",
  points,
  count,
  emojiIcon,
}) => {
  const config = {
    point: {
      icon: <div className="ic leaf" />,
      text: `${points}P 획득`,
    },
    emoji: {
      icon:
        typeof emojiIcon === "string" && emojiIcon.startsWith("/") ? (
          <img src={emojiIcon} alt="emoji" />
        ) : (
          <span>{emojiIcon}</span>
        ),
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

export default Tag;
