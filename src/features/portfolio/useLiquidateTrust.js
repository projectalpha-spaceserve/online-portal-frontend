import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { liquidateTrust as liquidateTrustApi } from "../../services/apiTrust";

export function useLiquidateTrust() {
  const token = localStorage.getItem("auth_token");

  const { mutate: liquidateTrust, isPending: isLiquidateTrust } = useMutation({
    mutationFn: (data) => liquidateTrustApi(token, data),
    onSuccess: () => toast.success("Request logged successfully!"),
    onError: (error) => {
      toast.error(error.message || "Failed to liquidate investment");
    },
  });

  return { liquidateTrust, isLiquidateTrust };
}
