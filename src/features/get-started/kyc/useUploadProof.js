import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { uploadProof as uploadProofApi } from "../../../services/apiKyc";

export function useUploadProof() {
  const token = localStorage.getItem("auth_token");

  const { mutateAsync: uploadProof, isPending: isUploadProof } = useMutation({
    mutationFn: (data) => uploadProofApi(token, data),

    onError: (error) => {
      toast.error(error.message || "Failed to upload proof");
    },
  });

  return { uploadProof, isUploadProof };
}
