import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { verifyExistingCustomerOtp } from "../../services/apiRegister";
import { useNavigate } from "react-router-dom";

export function useExistingVerifyOtp() {
  const navigate = useNavigate();

  const { mutate: existingVerifyOtp, isPending } = useMutation({
    mutationFn: (data) => verifyExistingCustomerOtp(data),
    onSuccess: (_, variables) => {
      toast.success(
        "OTP validated successfully! Please proceed to complete your registration.",
      );
      navigate("/existing-customer-register", {
        state: { email: variables.email, otp: variables.otp },
      });
    },
    onError: (err) => toast.error(err.message || "OTP verification failed"),
  });

  return { existingVerifyOtp, isExistingVerifyingOtp: isPending };
}
