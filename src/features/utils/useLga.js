import { useQuery } from "@tanstack/react-query";
import { getLga } from "../../services/apiUtils";

export function useLga() {
  const token = localStorage.getItem("auth_token");

  const {
    isPending: isLgaPending,
    data: lga = [],
    error: lgaError,
  } = useQuery({
    queryKey: ["lga"],
    queryFn: () => getLga(token),
  });

  return { isLgaPending, lga, lgaError };
}
