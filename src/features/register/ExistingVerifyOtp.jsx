import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import FormBtn from "../../components/FormBtn";
import OnBoard from "../../components/OnBoard";
import OtpInput from "../../components/OtpInput";
import ResendOtp from "../../components/ResendOtp";
import { useExistingVerifyEmail } from "./useExistingVerifyEmail";
import { useExistingVerifyOtp } from "./useExistingVerifyOtp";

function ExistingVerifyOtp() {
  const { existingVerifyEmail, isExistingVerifyingEmail } =
    useExistingVerifyEmail();
  const { existingVerifyOtp, isExistingVerifyingOtp } = useExistingVerifyOtp();
  const location = useLocation();

  const { email } = location.state || {};
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: email,
      otp: "",
    },
  });

  function onSubmit(data) {
    existingVerifyOtp(data);
  }

  return (
    <OnBoard title="Verify OTP">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="email" id="email" hidden {...register("email")} />
        <div>
          <label className="text-xs font-medium text-brand-850" htmlFor="otp">
            OTP
          </label>
          <OtpInput
            disabled={isExistingVerifyingOtp}
            onChange={(value) => setValue("otp", value)}
          />

          <input
            type="hidden"
            {...register("otp", {
              required: "Please enter your OTP",
              pattern: {
                value: /^[0-9]{6}$/,
                message: "OTP must be exactly 6 digits",
              },
            })}
          />
          {errors.otp && <ErrorMessage errorText={errors.otp.message} />}
        </div>
        <ResendOtp
          onResend={() => existingVerifyEmail({ email })}
          isLoading={isExistingVerifyingEmail}
        />
        <FormBtn disabled={isExistingVerifyingOtp}>
          {isExistingVerifyingOtp ? "Verifying..." : "Verify OTP"}
        </FormBtn>
      </form>
    </OnBoard>
  );
}

export default ExistingVerifyOtp;
