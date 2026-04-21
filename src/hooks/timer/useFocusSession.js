import { useEffect, useState, useCallback } from "react";
import {
  getFocusSession,
  createFocusSession,
  updateFocusSession,
} from "../../api/focus";

function useFocusSession(studyId) {
  const [sessions, setSessions] = useState([]);
  const [shouldShowSessionList, setShouldShowSessionList] = useState(false);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await getFocusSession(studyId);
        const { data } = res.data;
        if (!data || data.length === 0) return;
        setSessions(data);
        setShouldShowSessionList(true);
      } catch (e) {
        throw e;
      }
    };
    fetchSession();
  }, [studyId]);

  const createSession = useCallback(
    async ({ durationSec, title }) => {
      const res = await createFocusSession(studyId, { durationSec, title });
      return res.data.data;
    },
    [studyId],
  );

  const updateSession = useCallback(
    async (sessionId, action) => {
      const res = await updateFocusSession(studyId, sessionId, { action });
      return res.data.data;
    },
    [studyId],
  );

  return {
    sessions,
    shouldShowSessionList,
    createSession,
    updateSession,
  };
}

export default useFocusSession;
