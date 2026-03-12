import { useQuery } from "@tanstack/react-query";
import { getNokKyc } from "../../../services/apiKyc";

export function useNok() {
  const token = localStorage.getItem("auth_token");

  const {
    isPending: isNokPending,
    data: nok = {},
    error: nokError,
  } = useQuery({
    queryKey: ["nok"],
    queryFn: () => getNokKyc(token),
  });

  return { isNokPending, nok, nokError };
}
