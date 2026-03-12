import { useQuery } from "@tanstack/react-query";
import { getBanks } from "../../services/apiUtils";

export function useBanks() {
  const token = localStorage.getItem("auth_token");

  const {
    isPending: isBanksPending,
    data: banks = [],
    error: banksError,
  } = useQuery({
    queryKey: ["banks"],
    queryFn: () => getBanks(token),
  });

  return { isBanksPending, banks, banksError };
}
