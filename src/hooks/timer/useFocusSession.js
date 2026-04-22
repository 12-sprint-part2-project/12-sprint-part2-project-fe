import { useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  getFocusSession,
  createFocusSession,
  updateFocusSession,
} from "../../api/focus";

function useFocusSession(studyId) {
  const { data: sessions = [] } = useQuery({
    queryKey: ["sessions", studyId],
    queryFn: async () => {
      const res = await getFocusSession(studyId);
      return res.data.data || [];
    },
  });

  const shouldShowSessionList = sessions.length > 0;

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
