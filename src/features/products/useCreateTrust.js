import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createTrust as createTrustApi } from "../../services/apiTrust";

export function useCreateTrust() {
  const token = localStorage.getItem("auth_token");

  const { mutate: createTrust, isPending: isCreateTrust } = useMutation({
    mutationFn: (data) => createTrustApi(token, data),

    onError: (error) => {
      toast.error(error.message || "Failed to create investment");
    },
  });

  return { createTrust, isCreateTrust };
}
