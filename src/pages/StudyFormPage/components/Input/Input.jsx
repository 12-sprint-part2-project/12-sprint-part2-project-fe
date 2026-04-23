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
