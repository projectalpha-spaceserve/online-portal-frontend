import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { uploadSignature as uploadSignatureApi } from "../../../services/apiKyc";

export function useUploadSignature() {
  const token = localStorage.getItem("auth_token");

  const { mutateAsync: uploadSignature, isPending: isUploadSignature } =
    useMutation({
      mutationFn: (data) => uploadSignatureApi(token, data),

      onError: (error) => {
        toast.error(error.message || "Failed to upload signature");
      },
    });

  return { uploadSignature, isUploadSignature };
}
