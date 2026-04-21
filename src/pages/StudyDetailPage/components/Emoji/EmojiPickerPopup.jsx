import EmojiPicker from "emoji-picker-react";
import React, { useEffect, useRef } from "react";
import styles from "./Emoji.module.css";

const EmojiPickerPopup = ({ onEmojiClick, onClose }) => {
  const ref = useRef();

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    };

    document.addEventListener("mouseup", handler);
    return () => document.removeEventListener("mouseup", handler);
  }, [onClose]);

  return (
    <div ref={ref} className={styles.picker}>
      <EmojiPicker
        onEmojiClick={(emojiData) => onEmojiClick(emojiData.emoji)}
        searchPlaceHolder="Search"
        height={393}
        width={307}
      />
    </div>
  );
};

export default EmojiPickerPopup;
