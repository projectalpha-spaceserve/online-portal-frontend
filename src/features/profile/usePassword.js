import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updatePassword as updatePasswordApi } from "../../services/apiProfile";

export function usePassword() {
  const token = localStorage.getItem("auth_token");

  const { mutate: updatePassword, isPending: isUpdatingPassword } = useMutation(
    {
      mutationFn: (data) => updatePasswordApi(token, data),

      onSuccess: () => {
        toast.success("Password updated successfully.");
      },

      onError: (error) => {
        toast.error(error.message || "Failed to update password");
      },
    },
  );

  return { updatePassword, isUpdatingPassword };
}
