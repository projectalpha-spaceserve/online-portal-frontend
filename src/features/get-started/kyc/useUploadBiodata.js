import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { uploadBiodata as uploadBiodataApi } from "../../../services/apiKyc";

export function useUploadBiodata() {
  const queryClient = useQueryClient();
  const token = localStorage.getItem("auth_token");

  const { mutate: uploadBiodata, isPending: isUploadBiodata } = useMutation({
    mutationFn: (data) => uploadBiodataApi(token, data),

    onSuccess: async () => {
      toast.success("Biodata uploaded successfully.");

      // ✅ Wait for fresh KYC status
      await queryClient.invalidateQueries({ queryKey: ["kycStatus"] });
    },

    onError: (error) => {
      toast.error(error.message || "Failed to upload biodata");
    },
  });

  return { uploadBiodata, isUploadBiodata };
}
