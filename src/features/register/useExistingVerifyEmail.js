import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { verifyExistingCustomerEmail } from "../../services/apiRegister";

export function useExistingVerifyEmail() {
  const navigate = useNavigate();

  const { mutate: existingVerifyEmail, isPending } = useMutation({
    mutationFn: (data) => verifyExistingCustomerEmail(data),
    onSuccess: (data, variables) => {
      toast.success(
        `${data?.message || "Email verification successful"}! Please check your email for the OTP.`,
      );
      navigate("/existing-customer-otp", {
        state: { email: variables.email, otp: data?.otp },
      });
    },
    onError: (err) => toast.error(err.message || "Email verification failed"),
  });

  return { existingVerifyEmail, isExistingVerifyingEmail: isPending };
}
