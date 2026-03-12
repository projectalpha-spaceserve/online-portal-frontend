import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { resetPassword as resetPasswordApi } from "../../services/apiAuth";

export function useResetPassword() {
  const navigate = useNavigate();

  const { mutate: resetPassword, isPending: isPasswordReset } = useMutation({
    mutationFn: (email) => resetPasswordApi(email),
    onSuccess: (_, variables) => {
      toast.success("Check your email for OTP to complete password reset.");
      navigate("/verify-otp", {
        state: { email: variables.email },
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { resetPassword, isPasswordReset };
}
