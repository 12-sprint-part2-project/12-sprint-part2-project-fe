import React, { useEffect, useState } from "react";
import { addEmoji, getEmojis } from "../../../../api/studies";
import EmojiPreview from "../../../../components/EmojiPreview/EmojiPreview";
import EmojiPickerPopup from "./EmojiPickerPopup";
import EmojiRestDropdown from "./EmojiRestDropdown";
import styles from "./Emoji.module.css";

const RECENT_STUDIES = "recent_studies";

const Emoji = ({ studyId }) => {
  const [emojis, setEmojis] = useState([]); // 등록된 모든 이모지
  const [showPicker, setShowPicker] = useState(false); // picker showing 상태
  const [showRest, setShowRest] = useState(false); // 상위 3개 제외 이모지 showing 상태

  useEffect(() => {
    const fetchEmoji = async () => {
      try {
        const res = await getEmojis(studyId);
        const { data } = res.data;
        // console.log(res);
        setEmojis(data);
      } catch (error) {
        console.error(`이모지 불러오기 실패: ${error}`);
      }
    };

    fetchEmoji();
  }, [studyId]);

  const handleEmojiClick = async (emoji) => {
    await addEmoji(studyId, { emoji });

    setEmojis((prev) => {
      const exists = prev.find((p) => p.emoji === emoji);
      const result = exists
        ? prev.map((p) =>
            p.emoji === emoji ? { ...p, count: p.count + 1 } : p,
          )
        : [...prev, { emoji, count: 1 }];

      return result.sort((a, b) => b.count - a.count);
    });

    setShowPicker(false);
  };

  const top3 = emojis.slice(0, 3); // 상위 3개
  const rest = emojis.slice(3); // 나머지

  return (
    <div className={styles.emoji}>
      <div className={styles.emojiList}>
        <EmojiPreview emojis={top3} onEmojiClick={handleEmojiClick} />

        {rest.length > 0 && (
          <div>
            <button
              onMouseUp={(e) => e.stopPropagation()}
              onClick={() => setShowRest((prev) => !prev)}
              className={styles.restEmoji}
            >
              <span className={styles.iconPlus}></span> {rest.length}..
            </button>
            {showRest && (
              <EmojiRestDropdown
                emojis={rest}
                onEmojiClick={handleEmojiClick}
                onClose={() => setShowRest(false)}
              />
            )}
          </div>
        )}
      </div>

      <div className={styles.pickerWrap}>
        <button
          className={styles.addEmoji}
          onMouseUp={(e) => e.stopPropagation()}
          onClick={() => setShowPicker((prev) => !prev)}
        >
          <i className="ic smile"></i> 추가
        </button>
        {showPicker && (
          <EmojiPickerPopup
            onEmojiClick={handleEmojiClick}
            onClose={() => setShowPicker(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Emoji;
