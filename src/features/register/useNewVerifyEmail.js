import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { verifyNewCustomerEmail } from "../../services/apiRegister";

export function useNewVerifyEmail() {
  const navigate = useNavigate();

  const { mutate: newVerifyEmail, isPending } = useMutation({
    mutationFn: (data) => verifyNewCustomerEmail(data),
    onSuccess: (data, variables) => {
      toast.success(
        `${data?.message || "Email verification successful"}! Please check your email for the OTP.`,
      );
      // REMOVE THIS AND USE THE OTP FROM THE RESPONSE INSTEAD OF PASSING IT AS A PARAMETER
      navigate("/new-customer-otp", {
        state: { email: variables.email, otp: data?.data },
      });
    },
    onError: (err) => toast.error(err.message || "Email verification failed"),
  });

  return { newVerifyEmail, isNewVerifyingEmail: isPending };
}
