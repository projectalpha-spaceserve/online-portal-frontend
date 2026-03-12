import { useQuery } from "@tanstack/react-query";
import { getActiveMutuals } from "../../services/apiMutual";

export function useActiveMutuals() {
  const token = localStorage.getItem("auth_token");

  const {
    isPending: isActiveMutuals,
    data: activeMutuals = {},
    error,
  } = useQuery({
    queryKey: ["activeMutuals"],
    queryFn: () => getActiveMutuals(token),
    enabled: !!token,
  });

  return { isActiveMutuals, activeMutuals, error };
}
