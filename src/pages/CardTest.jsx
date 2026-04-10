import React from "react";
import Card from "../components/Card/Card";

const rowStyle = {
  display: "flex",
  flexWrap: "wrap",
  gap: "2rem",
  marginBottom: "3rem",
};

const CardTest = () => {
  const dummyEmojis = [
    { id: 1, icon: "🔥", count: 12 },
    { id: 2, icon: "🎯", count: 8 },
    { id: 3, icon: "📚", count: 5 },
  ];

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Card 테스트 페이지</h1>

      <section>
        <h2>Color Themes</h2>
        <div style={rowStyle}>
          <div>
            <p>GREEN (Normal)</p>
            <Card
              nickname="이유디"
              name="UX 스터디"
              points={150}
              days={15}
              description="Slow And Steady Wins The Race!!"
              emojis={dummyEmojis}
              theme="GREEN"
            />
          </div>
          <div>
            <p>PINK (Normal)</p>
            <Card
              nickname="이유디"
              name="UX 스터디"
              points={150}
              days={15}
              description="Slow And Steady Wins The Race!!"
              emojis={dummyEmojis}
              theme="PINK"
            />
          </div>
        </div>
      </section>

      <section>
        <h2>Picture Themes</h2>
        <div style={rowStyle}>
          <div>
            <p>DESK1 (Background Overlay)</p>
            <Card
              nickname="이유디"
              name="UX 스터디"
              points={150}
              days={15}
              description="Slow And Steady Wins The Race!!."
              emojis={dummyEmojis}
              theme="DESK1"
            />
          </div>
          <div>
            <p>LEAF (Background Overlay)</p>
            <Card
              nickname="이유디"
              name="UX 스터디"
              points={150}
              days={15}
              description="Slow And Steady Wins The Race!!."
              emojis={dummyEmojis}
              theme="LEAF"
            />
          </div>
        </div>
      </section>

      <section>
        <h2>Special Options (Feed & Responsive)</h2>
        <div style={rowStyle}>
          <div>
            <p>BLUE / isFeed=true</p>
            <Card
              nickname="피드"
              name="모바일 피드 레이아웃"
              points={100}
              days={7}
              description="모바일 사이즈(375px) 전용 레이아웃"
              emojis={dummyEmojis}
              theme="BLUE"
              isFeed={true}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default CardTest;
