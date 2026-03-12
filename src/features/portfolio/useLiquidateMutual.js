import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { liquidateMutual as liquidateMutualApi } from "../../services/apiMutual";

export function useLiquidateMutual() {
  const token = localStorage.getItem("auth_token");

  const { mutate: liquidateMutual, isPending: isLiquidateMutual } = useMutation(
    {
      mutationFn: (data) => liquidateMutualApi(token, data),
      onSuccess: () => toast.success("Request logged successfully!"),
      onError: (error) => {
        toast.error(error.message || "Failed to liquidate investment");
      },
    },
  );

  return { liquidateMutual, isLiquidateMutual };
}
