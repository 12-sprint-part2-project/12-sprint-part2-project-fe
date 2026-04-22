import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { checkSession } from "../api/studies";
import useToast from "./useToast";

function useStudySessionCheck(studyId) {
  const navigate = useNavigate();
  const { showToast } = useToast();

  useEffect(() => {
    const validateSession = async () => {
      try {
        await checkSession(studyId);
      } catch {
        showToast("warning", "스터디 비밀번호 인증 후 이용해주세요.");

        setTimeout(() => {
          navigate(`/studies/${studyId}`);
        }, 500);
      }
    };

    validateSession();
  }, [studyId, navigate, showToast]);
}

export default useStudySessionCheck;
