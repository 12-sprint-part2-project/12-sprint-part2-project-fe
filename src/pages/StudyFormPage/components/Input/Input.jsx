import React, { useState } from "react";
import styles from "./Input.module.css";

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
  isSubmitClicked,
}) => {
  //pwVisibleBtn 상태 true/false
  const [pwVisibleBtn, setPwVisibleBtn] = useState(false);
  //인풋이 현재 클릭되었는지. (클릭 되었다면, warningText는 표시하지 않도록 함.)
  return (
    <div className={styles.inputElement}>
      <label htmlFor="input" className={styles.label}>
        {title}
      </label>
      <div className={styles.inputContainer}>
        {isTextarea ? (
          <textarea
            type="text"
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
            className={`${styles.input} ${isSubmitClicked && !input && styles.noContent} ${isPassword && styles.pwInput}`}
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
      {isSubmitClicked && !input && (
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
