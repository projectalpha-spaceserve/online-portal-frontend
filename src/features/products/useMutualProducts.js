import { useQuery } from "@tanstack/react-query";
import { getMutualProducts } from "../../services/apiMutual";

export function useMutualProducts() {
  const token = localStorage.getItem("auth_token");

  const {
    isPending: isMutualProducts,
    data: mutualProducts = [],
    error,
  } = useQuery({
    queryKey: ["mutualProducts"],
    queryFn: () => getMutualProducts(token),
    enabled: !!token,
  });

  return { isMutualProducts, mutualProducts, error };
}
