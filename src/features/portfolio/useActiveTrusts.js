import { useQuery } from "@tanstack/react-query";
import { getActiveTrusts } from "../../services/apiTrust";

export function useActiveTrusts() {
  const token = localStorage.getItem("auth_token");

  const {
    isPending: isActiveTrusts,
    data: activeTrusts = {},
    error,
  } = useQuery({
    queryKey: ["activeTrusts"],
    queryFn: () => getActiveTrusts(token),
    enabled: !!token,
  });

  return { isActiveTrusts, activeTrusts, error };
}
