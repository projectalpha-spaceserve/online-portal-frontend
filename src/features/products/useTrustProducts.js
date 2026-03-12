import { useQuery } from "@tanstack/react-query";
import { getTrustProducts } from "../../services/apiTrust";

export function useTrustProducts() {
  const token = localStorage.getItem("auth_token");

  const {
    isPending: isTrustProducts,
    data: trustProducts = [],
    error,
  } = useQuery({
    queryKey: ["trustProducts"],
    queryFn: () => getTrustProducts(token),
    enabled: !!token,
  });

  return { isTrustProducts, trustProducts, error };
}
