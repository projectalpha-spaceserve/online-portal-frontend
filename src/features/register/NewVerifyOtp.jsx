import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage";
import FormBtn from "../../components/FormBtn";
import OnBoard from "../../components/OnBoard";
import OtpInput from "../../components/OtpInput";
import ResendOtp from "../../components/ResendOtp";
import { useNewVerifyEmail } from "./useNewVerifyEmail";
import { useNewVerifyOtp } from "./useNewVerifyOtp";

function NewVerifyOtp() {
  const { newVerifyEmail, isNewVerifyingEmail } = useNewVerifyEmail();
  const { newVerifyOtp, isNewVerifyingOtp } = useNewVerifyOtp();
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
    newVerifyOtp(data);
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
            disabled={isNewVerifyingOtp}
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
          onResend={() => newVerifyEmail({ email })}
          isLoading={isNewVerifyingEmail}
        />
        <FormBtn disabled={isNewVerifyingOtp}>
          {isNewVerifyingOtp ? "Verifying..." : "Verify OTP"}
        </FormBtn>
      </form>
    </OnBoard>
  );
}

export default NewVerifyOtp;
