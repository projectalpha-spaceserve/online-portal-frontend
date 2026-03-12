import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { topupTrust as topupTrustApi } from "../../services/apiTrust";

export function useTopupTrust() {
  const token = localStorage.getItem("auth_token");

  const { mutate: topupTrust, isPending: isTopupTrust } = useMutation({
    mutationFn: (data) => topupTrustApi(token, data),

    onError: (error) => {
      toast.error(error.message || "Failed to topup investment");
    },
  });

  return { topupTrust, isTopupTrust };
}
