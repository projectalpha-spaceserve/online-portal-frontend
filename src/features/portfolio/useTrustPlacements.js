import { useQuery } from "@tanstack/react-query";
import { viewPlacements } from "../../services/apiTrust";

export function useTrustPlacements(id) {
  const token = localStorage.getItem("auth_token");

  const {
    isPending: isTrustPlacements,
    data: trustPlacements = {},
    error,
  } = useQuery({
    queryKey: ["trustPlacements"],
    queryFn: () => viewPlacements(token, id),
    enabled: !!token && !!id,
  });

  return { isTrustPlacements, trustPlacements, error };
}
