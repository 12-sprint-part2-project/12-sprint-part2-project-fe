import React from "react";
import Tag from "../Tag/Tag";
import styles from "./Card.module.css";
import EmojiPreview from "../EmojiPreview/EmojiPreview";

const COLOR_THEMES = ["GREEN", "YELLOW", "BLUE", "PINK"];

const Card = ({
  nickname,
  title,
  points,
  days,
  description,
  emojis = [],
  theme,
  isFeed = false,
}) => {
  const isColorTheme = COLOR_THEMES.includes(theme);
  const textAdminClass = isColorTheme ? styles.colorThemeText : "";

  return (
    <div
      className={`
        ${styles.card}
        ${styles[`card-${theme}`]}
        ${isFeed ? styles["card-feed"] : ""}
      `}
    >
      <div className={styles.container}>
        <div className={styles.topContent}>
          <div className={styles.header}>
            <h3 className={`${styles.title} ${textAdminClass}`}>
              <span
                className={`${isColorTheme ? styles[`nickname-${theme}`] : ""}`}
              >
                {nickname}
              </span>
              의 {title}
            </h3>
            <Tag
              type="point"
              theme={isColorTheme ? "light" : "dark"}
              points={points}
            />
          </div>
          <p className={`${styles.days} ${textAdminClass}`}>
            {days}일째 진행 중
          </p>
        </div>

        <p className={`${styles.description} ${textAdminClass}`}>
          {description}
        </p>

        {/* <div className={styles.emojis}>
          {emojis.map((emoji) => (
            <Tag
              key={emoji.emoji}
              type="emoji"
              theme="dark"
              count={emoji.count}
              emojiIcon={emoji.emoji}
            />
          ))}
        </div> */}
        <EmojiPreview emojis={emojis} />
      </div>
    </div>
  );
};

export default Card;
