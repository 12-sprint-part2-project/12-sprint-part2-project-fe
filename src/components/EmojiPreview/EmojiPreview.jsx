import React from "react";
import Tag from "../Tag/Tag";
import styles from "./EmojiPreview.module.css";

const EmojiPreview = ({ emojis, onEmojiClick }) => {
  return (
    <div className={styles.emojiTop3}>
      {emojis.map(({ emoji, count }) => (
        <Tag
          key={emoji}
          variant="general"
          type="emoji"
          theme="dark"
          emojiIcon={emoji}
          count={count}
          onClick={onEmojiClick ? () => onEmojiClick(emoji) : undefined}
          style={onEmojiClick ? { cursor: "pointer" } : { cursor: "default" }}
        />
      ))}
    </div>
  );
};

export default EmojiPreview;
