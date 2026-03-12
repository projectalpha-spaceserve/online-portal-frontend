import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { uploadNOK } from "../../../services/apiKyc";

export function useUploadNok() {
  const queryClient = useQueryClient();
  const token = localStorage.getItem("auth_token");

  const { mutate: uploadNok, isPending: isUploadNok } = useMutation({
    mutationFn: (data) => uploadNOK(token, data),

    onSuccess: () => {
      toast.success("NOK uploaded successfully.");
      queryClient.invalidateQueries(["kycStatus"]);
    },

    onError: (error) => {
      toast.error(error.message || "Failed to upload NOK");
    },
  });

  return { uploadNok, isUploadNok };
}
