import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { checkSession } from "../api/studies";
import useToast from "./useToast";

function useStudySessionCheck(studyId) {
  const navigate = useNavigate();
  const { toast, showToast } = useToast();

  useEffect(() => {
    const validateSession = async () => {
      try {
        await checkSession(studyId);
      } catch (e) {
        console.log(e.userMessage);
        showToast("warning", e.userMessage);

        setTimeout(() => {
          navigate(`/studies/${studyId}`);
        }, 1000);
      }
    };

    validateSession();
  }, [studyId]);

  return { toast };
}

export default useStudySessionCheck;
