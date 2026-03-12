import { useQuery } from "@tanstack/react-query";
import { getBankDetails } from "../../../services/apiKyc";

export function useBank() {
  const token = localStorage.getItem("auth_token");

  const {
    isPending: isBank,
    data: bank = {},
    error: bankError,
  } = useQuery({
    queryKey: ["bank"],
    queryFn: () => getBankDetails(token),
  });

  return { isBank, bank, bankError };
}
