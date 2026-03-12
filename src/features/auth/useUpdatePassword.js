import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { updatePassword as updatePasswordApi } from "../../services/apiAuth";

export function useUpdatePassword() {
  const navigate = useNavigate();
  const { mutate: updatePassword, isPending: isUpdatingPassword } = useMutation(
    {
      mutationFn: (data) => updatePasswordApi(data),
      onSuccess: () => {
        toast.success("Password updated successfully!");
        navigate("/login");
      },
      onError: (err) => toast.error(err.message || "Failed to update password"),
    },
  );

  return { updatePassword, isUpdatingPassword };
}
