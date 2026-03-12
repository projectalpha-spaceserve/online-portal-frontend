import { useForm } from "react-hook-form";
import ErrorMessage from "../../components/ErrorMessage";
import OnBoard from "../../components/OnBoard";
import SpinnerMini from "../../components/SpinnerMini";
import { useResetPassword } from "./useResetPassword";
import FormBtn from "../../components/FormBtn";

function ResetPassword() {
  const { resetPassword, isPasswordReset } = useResetPassword();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (formData) => {
    resetPassword(formData, {
      onSettled: () => reset(),
    });
  };

  return (
    <OnBoard title="Verify Email">
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3 relative">
            <label
              className="text-xs font-medium text-[#333333]"
              htmlFor="email"
            >
              Email Address
            </label>
            <input
              type="email"
              autoComplete="username"
              disabled={isPasswordReset}
              className=" mt-1 border block w-full rounded-md border-[#DEDEDE] p-2 text-sm outline-none"
              {...register("email", {
                required: "Please enter your email",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Please provide a valid email address",
                },
              })}
            />

            {errors.email && <ErrorMessage errorText={errors.email.message} />}
          </div>

          <FormBtn>{isPasswordReset ? <SpinnerMini /> : "Continue"}</FormBtn>
        </form>
      </div>
    </OnBoard>
  );
}

export default ResetPassword;
