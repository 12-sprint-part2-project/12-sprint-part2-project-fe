import EmojiPicker from "emoji-picker-react";
import React, { useEffect, useRef } from "react";

const EmojiPickerPopup = ({ onEmojiClick, onClose }) => {
  const ref = useRef();

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedonw", handler);
  }, [onClose]);

  return (
    <div ref={ref}>
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
