import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Button from "../../../../components/Button/Button";
import { createStudy, updateStudy } from "../../../../api/studies";
import Toast from "../../../../components/Toast/Toast";
import useToast from "../../../../hooks/useToast";

import styles from "./Form.module.css";
import Input from "../Input/Input";
import Backgrounds from "../Backgrounds/Backgrounds";

import { useQueryClient } from "@tanstack/react-query";

const Form = ({ type, study }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  //input 상태 변수들
  const [nickname, setNickname] = useState(study?.nickname || "");
  const [title, setTitle] = useState(study?.title || "");
  const [description, setDescription] = useState(study?.description || "");
  const [password, setPassword] = useState(""); //비밀번호는 빈 값으로 둠! (보통 그렇지 않나;;)
  const [checkPassword, setCheckPassword] = useState("");

  //비밀번호 같은지 텍스트
  const [pwCheckWarningText, setPwCheckWarningText] = useState("");
  //비밀번호 일치/비일치 상태
  const [isPwSame, setIsPwSame] = useState();

  //토스트
  const { toast, showToast } = useToast();
  //배경 이미지 (추후에 따로 분리해두면 좋을듯)
  const [selectedBackground, setSelectedBackground] = useState("GREEN"); //기본값주기?

  //비밀번호 수정 여부 - false: 비밀번호 수정 버튼, true: 비밀번호 입력 창
  const [editPassword, setEditPassword] = useState(false);

  //제출 버튼을 클릭했는지 ( -> 클릭되었다면, 비어있는 input칸에 대해 붉은 표시)
  const [isSubmitClicked, setIsSubmitClicked] = useState(false);

  //비밀번호 확인 입력 시, 비밀번호와 일치하는지 검사하고, 일치하지 않다면 문구 띄우기
  useEffect(() => {
    if (password.trim() !== "" && checkPassword.trim() !== "") {
      if (password !== checkPassword) {
        setPwCheckWarningText("* 비밀번호가 일치하지 않습니다!");
        setIsPwSame(false);
      } else if (password === checkPassword) {
        setPwCheckWarningText("비밀번호가 일치합니다.");
        setIsPwSame(true);
      }
    } else {
      setPwCheckWarningText("");
    }
  }, [password, checkPassword]);

  //만들기/수정하기 버튼 클릭 시
  const onHandleSubmit = async () => {
    //제출 버튼 클릭 상태 true로.
    setIsSubmitClicked(true);
    //설명 제외 모든 곳에 입력이 되었는지 검사 -> 입력 안된 부분 있으면 토스트 메세지로 띄우기
    switch (type) {
      case "create":
        if (
          nickname.trim() === "" ||
          title.trim() === "" ||
          password.trim() === "" ||
          checkPassword.trim() === ""
        ) {
          showToast("warning", "입력이 필요합니다!");
          return;
        }
        break;
      case "modify":
        if (
          nickname.trim() === "" ||
          title.trim() === "" //||
          // password.trim() === "" ||
          // checkPassword.trim() === ""
        ) {
          showToast("warning", "입력이 필요합니다!");
          return;
        }
        break;
      default:
        break;
    }

    //비밀번호와 비밀번호 확인이 일치한지 검사 -> 다르면 토스트 메세지로 띄우기
    if (password !== checkPassword) {
      showToast("warning", "비밀번호가 일치하지 않습니다!");
      return;
    }

    //생성/수정 api 보내기
    let result;
    switch (type) {
      case "create":
        console.log("스터디 생성 요청 시작");
        result = await createStudy({
          title,
          nickname,
          description,
          password,
          theme: selectedBackground,
        });
        console.log("result=>", result);

        break;
      case "modify":
        console.log("스터디 수정 요청 시작");
        result = await updateStudy(study.id, {
          title,
          nickname,
          description,
          theme: selectedBackground,
          ...(editPassword ? { password } : {}), //password 수정 상태라면 password 값을 보냄.
        });
        console.log("result=>", result);
        break;
      default:
        console.log("type이 잘못되었습니다. type=>", type);
    }
    showToast("success", "등록되었습니다!");

    //리액트 쿼리 관련 코드
    const id = result.data.data.id;
    queryClient.invalidateQueries({
      queryKey: ["study", id],
    });

    console.log("이 id의 상세 페이지로 이동 =>", result.data.data.id);
    navigate(`/studies/${result.data.data.id}`); //create,modify모두 스터디 상세 페이지로 이동하도록 한다.
    //데이터가 등록된 후에 이동해야 하기에, Link가 아닌 navigate를 이용.
  };
  return (
    <form className={styles.studyForm}>
      <Input
        input={nickname}
        setInput={setNickname}
        title="닉네임"
        placeholder="닉네임을 입력해 주세요"
        warningText="* 닉네임을 입력해 주세요"
        isSubmitClicked={isSubmitClicked}
      />
      <Input
        input={title}
        setInput={setTitle}
        title="스터디 이름"
        placeholder="스터디 이름을 입력해 주세요"
        warningText="* 스터디 이름을 입력해 주세요"
        isSubmitClicked={isSubmitClicked}
      />
      <Input
        input={description}
        setInput={setDescription}
        title="소개"
        placeholder="소개 멘트를 작성해 주세요"
        isTextarea={true}
      />
      <Backgrounds
        selectedBackground={selectedBackground}
        setSelectedBackground={setSelectedBackground}
      />

      {editPassword ? (
        <div className={styles.passwordInputs}>
          <Input
            input={password}
            setInput={setPassword}
            title="비밀번호"
            placeholder="비밀번호를 입력해 주세요"
            warningText="* 비밀번호를 입력해 주세요"
            isPassword={true}
            isSubmitClicked={isSubmitClicked}
          />
          <Input
            input={checkPassword}
            setInput={setCheckPassword}
            title="비밀번호 확인"
            placeholder="비밀번호를 한번 더 입력해 주세요"
            isPassword={true}
            isPasswordCheck={true}
            isPwSame={isPwSame}
            pwCheckWarningText={pwCheckWarningText}
            isSubmitClicked={isSubmitClicked}
          />
          <button
            className={styles.editPasswordCancelBtn}
            onClick={() => {
              setEditPassword(false);
              setPassword("");
              setCheckPassword("");
            }}
          >
            비밀번호 수정 취소
          </button>
        </div>
      ) : (
        <button
          className={styles.editPasswordBtn}
          type="button"
          onClick={() => {
            setEditPassword(true);
          }}
        >
          비밀번호 수정
        </button>
      )}
      <div className={styles.button}>
        <Button
          label={type === "modify" ? "수정하기" : "만들기"}
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
  );
};

export default Form;
