import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { verifyToken as verifyTokenApi } from "../../services/apiAuth";

export function useVerifyToken() {
  const navigate = useNavigate();

  const { mutate: verifyToken, isPending: isVerifyToken } = useMutation({
    mutationFn: (otp) => verifyTokenApi(otp),
    onSuccess: (_, variables) => {
      toast.success(
        "OTP validated successfully! Please proceed to reset your password.",
      );
      navigate("/password-reset", {
        state: { email: variables.email, token: variables.token },
      });
    },

    onError: (err) => toast.error(err.message),
  });

  return { verifyToken, isVerifyToken };
}
