import { useQuery } from "@tanstack/react-query";
import { getLinkedAccounts } from "../../services/apiProfile";

export function useLinkedAccounts() {
  const token = localStorage.getItem("auth_token");

  const {
    isPending: isLinkedAccounts,
    data: linkedAccounts = [],
    error,
  } = useQuery({
    queryKey: ["linkedAccounts"],
    queryFn: () => getLinkedAccounts(token),
  });

  return { isLinkedAccounts, linkedAccounts, error };
}
