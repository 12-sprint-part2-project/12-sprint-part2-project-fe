import React, { useEffect, useState } from "react";
import styles from "./StudyForm.module.css";
import Button from "../../components/Button/Button";
//import { createStudy } from "../../api/studies";
import Toast from "../../components/Toast/Toast";

//이미지는 이렇게 가져와야 정상적으로 작동할 확률이 높다.
import desk1 from "../../assets/images/desk1.jpg";
import desk2 from "../../assets/images/desk2.jpg";
import tile from "../../assets/images/tile.jpg";
import leaf from "../../assets/images/leaf.jpg";

/*
TODO: 배경이미지 안보이는 거 해결해야됨
TODO: API 연동
TODO: 입력안도니 필드 빨간 테두리 처리
TODO: 설명 필드 늘어나는 거 처리
*/
function StudyForm() {
  //input 상태 변수들
  const [nickname, setNickname] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");

  const [pwWarning, setPwWarning] = useState("");

  const [selectedBackground, setSelectedBackground] = useState(1); //기본값주기?
  const backgrounds = [
    {
      id: 1,
      name: "GREEN",
      src: null,
      className: "background-green",
      alt: "background image - green",
    },
    {
      id: 2,
      name: "YELLOW",
      src: null,
      className: "background-yellow",
      alt: "background image - yellow",
    },
    {
      id: 3,
      name: "BLUE",
      src: null,
      className: "background-blue",
      alt: "background image - blue",
    },
    {
      id: 4,
      name: "PINK",
      src: null,
      className: "background-pink",
      alt: "background image - pink",
    },
    {
      id: 5,
      name: "DESK1",
      src: desk1,
      className: null,
      alt: "background image - desk1",
    },
    {
      id: 6,
      name: "DESK2",
      src: desk2,
      className: null,
      alt: "background image - desk2",
    },
    {
      id: 7,
      name: "TILE",
      src: tile,
      className: null,
      alt: "background image - tile",
    },
    {
      id: 8,
      name: "LEAF",
      src: leaf,
      className: null,
      alt: "background image - leaf",
    },
  ];

  //비밀번호 확인 입력 시, 비밀번호와 일치하는지 검사하고, 일치하지 않다면 문구 띄우기
  useEffect(() => {
    if (password.trim() !== "" && checkPassword.trim() !== "") {
      if (password !== checkPassword) {
        setPwWarning("비밀번호가 일치하지 않습니다!");
      } else if (password === checkPassword) {
        setPwWarning("비밀번호가 일치합니다.");
      }
    }
  }, [password, checkPassword]);

  //만들기 버튼 클릭 시
  const onHandleSubmit = () => {
    //설명 제외 모든 곳에 입력이 되었는지 검사 -> 입력 안된 부분 있으면 토스트 메세지로 띄우기
    if (
      nickname.trim() === "" ||
      title.trim() === "" ||
      description.trim() === "" ||
      password.trim() === "" ||
      checkPassword.trim() === ""
    ) {
      <Toast type="warning" text="아직 모두 입력되지 않았습니다!" />;
      return;
    }
    //비밀번호와 비밀번호 확인이 일치한지 검사 -> 다르면 토스트 메세지로 띄우기
    if (password !== checkPassword) {
      <Toast type="warning" text="비밀번호가 일치하지 않습니다!" />;
      return;
    }
    //생성 api 보내기
    // createStudy({
    //   title,
    //   nickname,
    //   description,
    //   password,
    //   theme: selectedBackground,
    // });
  };
  return (
    <div>
      <div className={styles.studyFormContainer}>
        <h2 className={styles.formTitle}>스터디 만들기</h2>
        <form className={styles.studyForm}>
          <div className={styles.inputElement}>
            <label htmlFor="nickname-input" className={styles.label}>
              닉네임
            </label>
            <input
              id="nickname-input"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="닉네임을 입력해 주세요"
              className={styles.input}
            />
          </div>
          <div className={styles.inputElement}>
            <label htmlFor="title-input" className={styles.label}>
              스터디 이름
            </label>
            <input
              id="title-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="스터디 이름을 입력해 주세요"
              className={styles.input}
            />
          </div>
          <div className={styles.inputElement}>
            <label htmlFor="description-input" className={styles.label}>
              소개
            </label>
            <input
              id="description-input"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="소개 멘트를 작성해 주세요"
              className={styles.input}
            />
          </div>
          <p className={styles.label}>배경을 선택해주세요</p>
          <div className={styles.backgrounds}>
            {backgrounds.map((background) => {
              return (
                <div
                  key={background.id}
                  onClick={() => {
                    setSelectedBackground(background.id);
                  }}
                  className={styles.background}
                >
                  {background.className && (
                    <div
                      className={`${styles.colorchip} ${styles[background.className]}`}
                    />
                  )}
                  {background.src && (
                    <img src={background.src} alt={background.alt} />
                  )}

                  {selectedBackground === background.id ? (
                    <div className={styles.pawContainer}>
                      <div className={`ic paw ${styles.paw}`} />
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              );
            })}
          </div>
          <div className={styles.inputElement}>
            <label htmlFor="password-input" className={styles.label}>
              비밀번호
            </label>
            <input
              id="password-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력해 주세요"
              className={styles.input}
            />
          </div>

          <div className={styles.inputElement}>
            <label htmlFor="password-check-input" className={styles.label}>
              비밀번호 확인
            </label>
            <input
              id="password-check-input"
              value={checkPassword}
              onChange={(e) => setCheckPassword(e.target.value)}
              placeholder="비밀번호를 한번 더 입력해 주세요"
              className={styles.input}
            />
            <p className={styles.warningText}>{pwWarning}</p>
          </div>
          <div className={styles.button}>
            <Button label="만들기" onClick={onHandleSubmit} />
          </div>
        </form>
      </div>
    </div>
  );
}

export default StudyForm;
