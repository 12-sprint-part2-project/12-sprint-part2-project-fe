import React from "react";
import Button from "../components/Button/Button";

const sectionStyle = {
  marginBottom: "3rem",
};

const labelStyle = {
  fontSize: "0.875rem",
  marginBottom: "0.5rem",
  opacity: 0.6,
};

// 반응형 wrapper
const styles = `
  .btn-navigate {
    width: 37.5rem;
    height: 3.625rem;
  }
  .btn-create {
    width: 40.5rem;
    height: 3.625rem;
  }
  .btn-go-edit {
    width: 37.5rem;
    height: 3.625rem;
  }
  .btn-confirm {
    width: 37.5rem;
    height: 3.625rem;
  }
  .btn-edit {
    width: 18rem;
    height: 3.625rem;
  }
  .btn-edit-cancel {
    width: 18rem;
    height: 3.625rem;
  }

  /* 모바일 */
  @media (max-width: 375px) {
    .btn-navigate {
      width: 19.5rem;
    }
    .btn-create {
      width: 19.5rem;
    }
    .btn-go-edit {
      width: 19.5rem;
    }
    .btn-confirm {
      width: 8.75rem;
    }
    .btn-edit {
      width: 8.75rem;
    }
    .btn-edit-cancel {
      width: 8.75rem;
    }
  }
`;

const ButtonTest = () => {
  return (
    <div style={{ padding: "2rem", backgroundColor: "var(--bg-primary)" }}>
      <style>{styles}</style>
      <h1 style={{ marginBottom: "2rem" }}>Button 테스트 페이지</h1>

      {/* 페이지 이동 — 2단계 */}
      <section style={sectionStyle}>
        <h2 style={{ marginBottom: "1rem" }}>
          페이지 이동{" "}
          <span style={{ fontWeight: 400, fontSize: "1rem" }}>
            (데스크탑 → 모바일)
          </span>
        </h2>
        <p style={labelStyle}>37.5rem → 19.5rem</p>
        <div className="btn-navigate">
          <Button
            variant="create"
            label="오늘의 습관으로 가기"
            onClick={() => {}}
          />
        </div>
      </section>

      {/* 만들기 — 2단계 */}
      <section style={sectionStyle}>
        <h2 style={{ marginBottom: "1rem" }}>
          만들기{" "}
          <span style={{ fontWeight: 400, fontSize: "1rem" }}>
            (데스크탑 → 모바일)
          </span>
        </h2>
        <p style={labelStyle}>40.5rem → 19.5rem</p>
        <div className="btn-create">
          <Button variant="create" label="만들기" onClick={() => {}} />
        </div>
      </section>

      {/* 수정하러 가기 — 2단계 */}
      <section style={sectionStyle}>
        <h2 style={{ marginBottom: "1rem" }}>
          수정하러 가기{" "}
          <span style={{ fontWeight: 400, fontSize: "1rem" }}>
            (데스크탑 → 모바일)
          </span>
        </h2>
        <p style={labelStyle}>37.5rem → 19.5rem</p>
        <div className="btn-go-edit">
          <Button variant="create" label="수정하러 가기" onClick={() => {}} />
        </div>
      </section>

      {/* 확인 — 3단계 */}
      <section style={sectionStyle}>
        <h2 style={{ marginBottom: "1rem" }}>
          확인{" "}
          <span style={{ fontWeight: 400, fontSize: "1rem" }}>
            (데스크탑 → 태블릿 → 모바일)
          </span>
        </h2>
        <p style={labelStyle}>37.5rem → 18rem → 8.75rem</p>
        <div className="btn-confirm">
          <Button variant="create" label="확인" onClick={() => {}} />
        </div>
      </section>

      {/* 수정완료 / 취소 — 2단계 */}
      <section style={sectionStyle}>
        <h2 style={{ marginBottom: "1rem" }}>
          수정완료 / 취소{" "}
          <span style={{ fontWeight: 400, fontSize: "1rem" }}>
            (데스크탑 → 모바일)
          </span>
        </h2>
        <p style={labelStyle}>18rem → 8.75rem</p>
        <div style={{ display: "flex", gap: "0.625rem" }}>
          <div className="btn-edit">
            <Button variant="create" label="수정 완료" onClick={() => {}} />
          </div>
          <div className="btn-edit-cancel">
            <Button variant="cancel" label="취소" onClick={() => {}} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default ButtonTest;
