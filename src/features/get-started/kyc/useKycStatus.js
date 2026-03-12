import { useQuery } from "@tanstack/react-query";
import { getKycStatus } from "../../../services/apiKyc";

export function useKycStatus() {
  const token = localStorage.getItem("auth_token");

  const {
    isPending: isKycStatus,
    data: kycStatus = {},
    error,
  } = useQuery({
    queryKey: ["kycStatus"],
    queryFn: () => getKycStatus(token),
    enabled: !!token,
  });

  return { isKycStatus, kycStatus, error };
}
