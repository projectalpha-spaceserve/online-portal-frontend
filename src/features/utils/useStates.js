import { useQuery } from "@tanstack/react-query";
import { getState } from "../../services/apiUtils";

export function useStates() {
  const token = localStorage.getItem("auth_token");

  const {
    isPending: isStatePending,
    data: state = [],
    error: stateError,
  } = useQuery({
    queryKey: ["state"],
    queryFn: () => getState(token),
  });

  return { isStatePending, state, stateError };
}
