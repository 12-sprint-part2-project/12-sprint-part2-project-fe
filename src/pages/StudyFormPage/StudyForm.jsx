import React, { useEffect, useState } from "react";
import styles from "./StudyForm.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import Form from "./components/Form/Form";
import Title from "./components/Title/Title";

//type
//- modify : 수정을 위한 ui,
//  StudyDetail에서 study 객체를 넘겨줌.
//  기존 스터디 객체를 상태변수의 기본 값으로 설정. create면 빈 객체니까 자동으로 빈 값으로 들어갈 것.
//- create : 생성을 위한 ui
function StudyForm({ type = "create", study = {} }) {
  //일단 지금은 navigate로만 접근하기 때문에, 실질적으로 props는 필요가 없음. 그러나 혹시 모르니 남겨둔다..
  //만약 다른 곳에서 얘를 컴포넌트로 사용하게 된다면..그러면 필요한..

  //현재 Form의 타입과 주어진 study를 검사해보기 위함.
  useEffect(() => {
    console.log("type=>", type);
    console.log("study=>", study);
  }, []);

  //navigate로 넘어왔을 시, location으로 인자를 꺼내준다.
  const location = useLocation();
  type = location.state?.type || "create"; //없을 경우, "create"가 유지되는 것이 아니라, undefined가 들어가게 되는 것 같다. 여기에도 그냥 "create"를 default값으로 넣어주었다. props의 create의 기본값은 필요없어지지만, 이해도를 위해 남겨두겠다.
  study = location.state?.study;

  return (
    <div className={styles.container}>
      <div className={styles.studyFormContainer}>
        <Title type={type} />
        <Form type={type} study={study} />
      </div>
    </div>
  );
}

export default StudyForm;
