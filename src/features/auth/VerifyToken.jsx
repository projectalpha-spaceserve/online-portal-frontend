import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import OnBoard from "../../components/OnBoard";
import ErrorMessage from "../../components/ErrorMessage";
import FormBtn from "../../components/FormBtn";
import { useVerifyToken } from "./useVerifyToken";

function VerifyToken() {
  const { verifyToken, isVerifyToken } = useVerifyToken();
  const location = useLocation();

  const { email } = location.state || {};
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: email,
    },
  });

  function onSubmit(data) {
    verifyToken(data);
  }

  return (
    <OnBoard title="Verify OTP">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="email" id="email" hidden {...register("email")} />
        <div>
          <label className="text-xs font-medium text-brand-850" htmlFor="otp">
            OTP
          </label>
          <input
            type="text"
            maxLength={6}
            id="otp"
            disabled={isVerifyToken}
            className="mt-1 border block w-full rounded-md border-brand-825 p-2 text-sm outline-none"
            {...register("token", {
              required: "Please enter your OTP",
              pattern: {
                value: /^[0-9]{6}$/,
                message: "OTP must be exactly 6 digits",
              },
            })}
            onInput={(e) => {
              e.target.value = e.target.value.replace(/\D/g, "").slice(0, 6);
            }}
          />
          {errors.token && <ErrorMessage errorText={errors.token.message} />}
        </div>
        <FormBtn disabled={isVerifyToken}>
          {isVerifyToken ? "Verifying..." : "Verify OTP"}
        </FormBtn>
      </form>
    </OnBoard>
  );
}

export default VerifyToken;
