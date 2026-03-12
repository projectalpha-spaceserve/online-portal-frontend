import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { getMutualStatement } from "../../services/apiMutual";

export function useMutualStatement() {
  const token = localStorage.getItem("auth_token");

  const { mutate: mutualStatement, isPending: isMutualStatement } = useMutation(
    {
      mutationFn: (data) => getMutualStatement(token, data),
      onSuccess: () => toast.success("Request logged successfully!"),
      onError: (error) => {
        toast.error(error.message || "Failed to fetch mutual statement");
      },
    },
  );

  return { mutualStatement, isMutualStatement };
}
