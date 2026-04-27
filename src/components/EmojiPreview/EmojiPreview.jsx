import React from "react";
import Tag from "../Tag/Tag";
import styles from "./EmojiPreview.module.css";

const EmojiPreview = ({ emojis, onEmojiClick }) => {
  return (
    <div className={styles.emojiTop3}>
      {emojis.map(({ emoji, count }) => (
        <Tag
          key={emoji}
          type="emoji"
          theme="dark"
          variant="general"
          count={count}
          emojiIcon={emoji}
          onClick={onEmojiClick ? () => onEmojiClick(emoji) : undefined}
        />
      ))}
    </div>
  );
};

export default EmojiPreview;
