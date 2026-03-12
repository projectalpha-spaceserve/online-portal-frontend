import { useQuery } from "@tanstack/react-query";
import { getActiveMutual } from "../../services/apiMutual";

export function useActiveMutual(id) {
  const token = localStorage.getItem("auth_token");

  const {
    isPending: isMutualProduct,
    data: mutualProduct = {},
    error,
  } = useQuery({
    queryKey: ["mutualProduct", id],
    queryFn: () => getActiveMutual(token, id),
    enabled: !!token && !!id,
  });

  return { isMutualProduct, mutualProduct, error };
}
