import { useMutation } from "@tanstack/react-query";
import { register as registerApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useRegister() {
  const navigate = useNavigate();

  const { mutate: register, isLoading } = useMutation({
    mutationFn: registerApi,
    onSuccess: (_, variables) => {
      toast.success(
        "Registration successful! Please check your email for the OTP."
      );

      navigate("/verify-otp", {
        state: { email: variables.email },
      });
      console.log(variables.email, "variables");
    },
    onError: (error) => {
      toast.error(
        error.message || "Account registration failed, please try again."
      );
      console.log(error);
    },
  });

  return { register, isLoading };
}
