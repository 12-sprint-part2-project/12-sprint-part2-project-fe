import React, { useEffect, useRef } from "react";
import Tag from "../../../../components/Tag/Tag";
import styles from "./Emoji.module.css";

const EmojiRestDropdown = ({ emojis, onEmojiClick, onClose }) => {
  const ref = useRef();

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    };

    document.addEventListener("mouseup", handler);
    return () => document.removeEventListener("mouseup", handler);
  }, [onClose]);

  return (
    <div ref={ref} className={styles.dropdown}>
      {emojis.map(({ emoji, count }) => (
        <Tag
          key={emoji}
          variant="general"
          type="emoji"
          theme="dark"
          emojiIcon={emoji}
          count={count}
          onClick={() => onEmojiClick(emoji)}
          styles={{ cursor: "pointer" }}
        />
      ))}
    </div>
  );
};

export default EmojiRestDropdown;
