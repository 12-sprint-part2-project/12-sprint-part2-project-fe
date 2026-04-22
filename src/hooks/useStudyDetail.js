import { useQuery } from "@tanstack/react-query";
import { getStudyDetail } from "../api/studies";

function useStudyDetail(studyId) {
  return useQuery({
    queryKey: ["study", studyId],
    queryFn: () => getStudyDetail(studyId).then((res) => res.data.data),
    staleTime: 1000 * 60 * 5,
  });
}

export default useStudyDetail;
