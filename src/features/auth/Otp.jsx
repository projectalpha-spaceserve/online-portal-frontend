import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage";
import FormBtn from "../../components/FormBtn";
import OnLoginPage from "../../components/OnLoginPage";
import OtpInput from "../../components/OtpInput";
import ResendOtp from "../../components/ResendOtp";
import { useLogin } from "./useLogin";
import { useOtp } from "./useOtp";

function Otp() {
  const { verifyOtp, isLoadingOtp } = useOtp();
  const location = useLocation();
  const { email } = location.state || {};
  const { login, isPending } = useLogin();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: email,
      token: "",
    },
  });

  function onSubmit(data) {
    verifyOtp(data);
  }

  return (
    <OnLoginPage>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="email" hidden {...register("email")} />

        <div>
          <label className="text-xs font-medium text-brand-850">OTP</label>
          <OtpInput
            disabled={isLoadingOtp}
            onChange={(value) => setValue("token", value)}
          />

          <input
            type="hidden"
            {...register("token", {
              required: "Please enter your OTP",
              pattern: {
                value: /^[0-9]{6}$/,
                message: "OTP must be exactly 6 digits",
              },
            })}
          />

          {errors.token && <ErrorMessage errorText={errors.token.message} />}
        </div>

        <ResendOtp onResend={() => login({ email })} isLoading={isPending} />

        <FormBtn disabled={isLoadingOtp}>
          {isLoadingOtp ? "Verifying..." : "Verify OTP"}
        </FormBtn>
      </form>
    </OnLoginPage>
  );
}

export default Otp;
