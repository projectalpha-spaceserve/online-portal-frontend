import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { uploadID as uploadIDApi } from "../../../services/apiKyc";

export function useUploadID() {
  const token = localStorage.getItem("auth_token");

  const { mutateAsync: uploadID, isPending: isUploadID } = useMutation({
    mutationFn: (data) => uploadIDApi(token, data),

    onError: (error) => {
      toast.error(error.message || "Failed to upload ID");
    },
  });

  return { uploadID, isUploadID };
}
