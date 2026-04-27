import styles from "./StudyForm.module.css";
import { useLocation } from "react-router-dom";
import Form from "./components/Form/Form";
import Title from "./components/Title/Title";
/*
type
- create : 스터디 생성 폼
- modify : 스터디 수정 폼
  ㄴ StudyDetail페이지에서 스터디 수정 시, study 객체를 location으로 넘겨받는다.

*/

function StudyForm({ type = "create", study = {} }) {
  //create는 빈 값이고, modify는 navigate로 접근되기에 실질적으로 변수를 Props로 써야 하는 것은 아니다. 그러나 확장성을 위해 남겨두겠다.
  // //디버깅용 코드. 현재 Form의 타입과 주어진 study를 검사해보기 위함.
  // useEffect(() => {
  //   console.log("type=>", type);
  //   console.log("study=>", study);
  // }, []);

  //navigate로 넘어왔을 시, location으로 인자를 꺼내준다.
  const location = useLocation();
  type = location.state?.type || "create"; //없을 경우, 기본값인 "create"가 유지되는 것이 아니라, undefined가 들어가게 되므로, "create"를 default값으로 넣어주었다.
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
