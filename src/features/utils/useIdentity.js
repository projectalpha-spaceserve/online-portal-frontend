import { useQuery } from "@tanstack/react-query";
import { getIdentity } from "../../services/apiUtils";

export function useIdentity() {
  const token = localStorage.getItem("auth_token");

  const {
    isPending: isIdentityPending,
    data: identity = [],
    error,
  } = useQuery({
    queryKey: ["identity"],
    queryFn: () => getIdentity(token),
  });

  return { isIdentityPending, identity, error };
}
