import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { login as loginApi } from "../../services/apiAuth";
export function useLogin() {
  const navigate = useNavigate();

  const { mutate: login, isPending } = useMutation({
    mutationFn: (data) => loginApi(data),
    onSuccess: (_, variables) => {
      navigate("/login-verify-otp", {
        state: { email: variables.email },
      });
      toast.success("Please check your email for OTP.");
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message || "Invalid email or password");
    },
  });

  return { login, isPending };
}
