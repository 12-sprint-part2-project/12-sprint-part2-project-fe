import React, { useEffect, useState } from "react";
import styles from "./StudyForm.module.css";
import Button from "../../components/Button/Button";
//import { createStudy, updateStudy } from "../../api/studies";
import Toast from "../../components/Toast/Toast";

//이미지는 이렇게 가져와야 정상적으로 작동할 확률이 높다.
import desk1 from "../../assets/images/desk1.jpg";
import desk2 from "../../assets/images/desk2.jpg";
import tile from "../../assets/images/tile.jpg";
import leaf from "../../assets/images/leaf.jpg";

/*
TODO: API 연동
*/

//type
//- modify : 수정을 위한 ui,
//  StudyDetail에서 study 객체를 넘겨줌.
//  기존 스터디 객체를 상태변수의 기본 값으로 설정. create면 빈 객체니까 자동으로 빈 값으로 들어갈 것.
//- create : 생성을 위한 ui
function StudyForm({ type = "create", study = {} }) {
  //input 상태 변수들
  const [nickname, setNickname] = useState(study.nickname || "");
  const [title, setTitle] = useState(study.title || "");
  const [description, setDescription] = useState(study.description || "");
  const [password, setPassword] = useState(""); //비밀번호는 빈 값으로 둠! (보통 그렇지 않나;;)
  const [checkPassword, setCheckPassword] = useState("");

  //빨간 텍스트
  const [pwWarning, setPwWarning] = useState("");

  //비밀번호 눈 버튼
  const [pwVisibleBtn, setPwVisibleBtn] = useState(false);
  const [checkPwVisibleBtn, setCheckPwVisibleBtn] = useState(false);

  //토스트
  const [toast, setToast] = useState(null);

  //배경 이미지 (추후에 따로 분리해두면 좋을듯)
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
        setPwWarning("* 비밀번호가 일치하지 않습니다!");
      } else if (password === checkPassword) {
        setPwWarning("비밀번호가 일치합니다.");
      }
    } else {
      setPwWarning("");
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
      setToast({ type: "warning", text: "아직 모두 입력되지 않았습니다!" });
      return;
    }
    //비밀번호와 비밀번호 확인이 일치한지 검사 -> 다르면 토스트 메세지로 띄우기
    if (password !== checkPassword) {
      setToast({ type: "warning", text: "비밀번호가 일치하지 않습니다!" });

      return;
    }
    //생성/수정 api 보내기
    switch (type) {
      case "create":
        createStudy({
          title,
          nickname,
          description,
          password,
          theme: selectedBackground,
        });
        break;
      case "modify":
        updateStudy({
          title,
          nickname,
          description,
          password,
          theme: selectedBackground,
        });
        break;
      default:
        console.log("type이 잘못되었습니다. type=>", type);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.studyFormContainer}>
        <h2 className={styles.formTitle}>
          {type === "modify" ? "스터디 수정" : "스터디 만들기"}
        </h2>
        <form className={styles.studyForm}>
          <div className={styles.inputElement}>
            <label htmlFor="nickname-input" className={styles.label}>
              닉네임
            </label>
            <input
              type="text"
              id="nickname-input"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="닉네임을 입력해 주세요"
              className={`${styles.input} ${!nickname && styles.noContent}`}
            />
            {!nickname && (
              <p className={styles.warningText}>* 닉네임을 입력해 주세요</p>
            )}
          </div>
          <div className={styles.inputElement}>
            <label htmlFor="title-input" className={styles.label}>
              스터디 이름
            </label>
            <input
              type="text"
              id="title-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="스터디 이름을 입력해 주세요"
              className={`${styles.input} ${!title && styles.noContent}`}
            />
            {!title && (
              <p className={styles.warningText}>
                * 스터디 이름을 입력해 주세요
              </p>
            )}
          </div>
          <div className={styles.inputElement}>
            <label htmlFor="description-input" className={styles.label}>
              소개
            </label>
            <textarea
              type="text"
              id="description-input"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="소개 멘트를 작성해 주세요"
              className={styles.textarea}
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
            <div className={styles.inputContainer}>
              <input
                type={pwVisibleBtn ? "text" : "password"}
                id="password-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호를 입력해 주세요"
                className={`${styles.input} ${!password && styles.noContent} ${styles.pwInput}`}
              />

              <button
                type="button"
                className={pwVisibleBtn ? "ic visible" : "ic hidden"}
                onClick={() => {
                  setPwVisibleBtn(!pwVisibleBtn);
                }}
              />
            </div>
            {!password && (
              <p className={styles.warningText}>* 비밀번호를 입력해 주세요</p>
            )}
          </div>

          <div className={styles.inputElement}>
            <label htmlFor="password-check-input" className={styles.label}>
              비밀번호 확인
            </label>
            <div className={styles.inputContainer}>
              <input
                type={checkPwVisibleBtn ? "text" : "password"}
                id="password-check-input"
                value={checkPassword}
                onChange={(e) => setCheckPassword(e.target.value)}
                placeholder="비밀번호를 한번 더 입력해 주세요"
                className={styles.input}
              />
              <button
                type="button"
                className={checkPwVisibleBtn ? "ic visible" : "ic hidden"}
                onClick={() => {
                  setCheckPwVisibleBtn(!checkPwVisibleBtn);
                }}
              />
            </div>

            <p className={styles.warningText}>{pwWarning}</p>
          </div>
          <div className={styles.button}>
            <Button
              label="만들기"
              onClick={(e) => {
                e.preventDefault();
                onHandleSubmit();
              }}
            />
          </div>
          <div className={styles.toast}>
            {toast && <Toast type={toast.type} text={toast.text} />}
          </div>
        </form>
      </div>
    </div>
  );
}

export default StudyForm;
