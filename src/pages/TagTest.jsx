import React from "react";
import Tag from "../components/Tag/Tag";

const rowStyle = {
  display: "flex",
  gap: "1.5rem",
};

const TagTest = () => {
  return (
    <div style={{ backgroundColor: "var(--brand)" }}>
      <h1 style={{ marginBottom: "1rem" }}>Tag 테스트 페이지</h1>

      <div>
        <h2>point</h2>

        <div style={rowStyle}>
          <div>
            <p>point / light</p>
            <Tag type="point" theme="light" points={10} />
          </div>

          <div>
            <p>point / dark</p>
            <Tag type="point" theme="dark" points={10} />
          </div>

          <div>
            <p>point / light / general</p>
            <Tag type="point" theme="light" variant="general" points={100} />
          </div>
        </div>
      </div>

      <div>
        <h2>emoji</h2>

        <div style={rowStyle}>
          <div>
            <p>emoji / light</p>
            <Tag type="emoji" theme="light" count={3} emojiIcon="🔥" />
          </div>

          <div>
            <p>emoji / dark</p>
            <Tag type="emoji" theme="dark" count={12} emojiIcon="🎯" />
          </div>

          <div>
            <p>emoji / light / general</p>
            <Tag
              type="emoji"
              theme="light"
              variant="general"
              count={99}
              emojiIcon="📚"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TagTest;
