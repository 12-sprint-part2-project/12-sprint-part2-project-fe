import { useState } from "react";
import styles from "./Input.module.css";

/*
Form에 사용되는 Input

자주 쓰이는 요소이기에, 컴포넌트로 분리함.

비밀번호 관련한 인풋은, 기존의 인풋과는 조금 다르게 작동하는 부분이 있으므로, 이를 위한 Props가 여럿 존재한다.
*/

const Input = ({
  input,
  setInput,
  title,
  placeholder,
  warningText,
  isPassword = false,
  isPasswordCheck = false,
  pwCheckWarningText,
  isPwSame,
  isTextarea,
}) => {
  //pwVisibleBtn 상태 true/false
  const [pwVisibleBtn, setPwVisibleBtn] = useState(false);
  return (
    <div className={styles.inputElement}>
      <label htmlFor="input" className={styles.label}>
        {title}
      </label>
      <div className={styles.inputContainer}>
        {isTextarea ? (
          <textarea
            id="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={placeholder}
            className={styles.textarea}
          />
        ) : (
          <input
            type={!isPassword ? "text" : pwVisibleBtn ? "text" : "password"}
            id="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={placeholder}
            className={`${styles.input} ${warningText?.length > 0 && styles.noContent} ${isPassword && styles.pwInput}`}
          />
        )}

        {isPassword && (
          <button
            type="button"
            className={pwVisibleBtn ? "ic visible" : "ic hidden"}
            onClick={() => {
              setPwVisibleBtn(!pwVisibleBtn);
            }}
          />
        )}
      </div>
      {warningText?.length > 0 && (
        <p className={styles.warningText}>{warningText}</p>
      )}
      {isPasswordCheck && (
        <p
          className={`${isPwSame && styles.correctText} ${!isPwSame && styles.warningText}`}
        >
          {pwCheckWarningText}
        </p>
      )}
    </div>
  );
};

export default Input;
