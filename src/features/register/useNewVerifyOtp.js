import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { verifyNewCustomerOtp } from "../../services/apiRegister";
import { useNavigate } from "react-router-dom";

export function useNewVerifyOtp() {
  const navigate = useNavigate();
  const { mutate: newVerifyOtp, isPending } = useMutation({
    mutationFn: (data) => verifyNewCustomerOtp(data),
    onSuccess: (_, variables) => {
      toast.success(
        "OTP validated successfully! Please proceed to complete your registration.",
      );
      navigate("/new-customer-register", {
        state: { email: variables.email, otp: variables.otp },
      });
    },
    onError: (err) => toast.error(err.message || "OTP verification failed"),
  });

  return { newVerifyOtp, isNewVerifyingOtp: isPending };
}
