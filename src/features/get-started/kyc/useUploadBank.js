import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { uploadBank as uploadBankApi } from "../../../services/apiKyc";

export function useUploadBank() {
  const queryClient = useQueryClient();
  const token = localStorage.getItem("auth_token");

  const { mutate: uploadBank, isPending: isUploadBank } = useMutation({
    mutationFn: (data) => uploadBankApi(token, data),

    onSuccess: async () => {
      toast.success("Bank details uploaded successfully.");

      // ✅ Wait for fresh KYC status
      await queryClient.invalidateQueries({ queryKey: ["kycStatus"] });
    },

    onError: (error) => {
      toast.error(error.message || "Failed to upload bank details");
    },
  });

  return { uploadBank, isUploadBank };
}
