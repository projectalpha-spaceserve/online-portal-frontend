import { useQuery } from "@tanstack/react-query";
import { getSecurityQuestions } from "../../services/apiProfile";

export function useSecurityQuestions() {
  const token = localStorage.getItem("auth_token");

  const {
    isPending: isSecurityQuestionsPending,
    data: securityQuestions = [],
    error,
  } = useQuery({
    queryKey: ["securityQuestions"],
    queryFn: () => getSecurityQuestions(token),
  });

  return { isSecurityQuestionsPending, securityQuestions, error };
}
