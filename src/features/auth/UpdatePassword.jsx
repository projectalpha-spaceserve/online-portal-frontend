import { useState } from "react";
import { useForm } from "react-hook-form";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { useLocation } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage";
import { useUpdatePassword } from "./useUpdatePassword";
import OnBoard from "../../components/OnBoard";
import FormBtn from "../../components/FormBtn";
import SpinnerMini from "../../components/SpinnerMini";

function UpdatePassword() {
  const { updatePassword, isUpdatingPassword } = useUpdatePassword();
  const [openPassword, setOpenPassword] = useState(false);
  const [openConfirm, setConfirm] = useState(false);

  const location = useLocation();

  const { email, token } = location.state || {};

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: email,
      token: token,
    },
    mode: "onChange",
  });

  function onSubmit(data) {
    const { confirm_password, ...payload } = data;
    updatePassword(payload, { onSettled: () => reset() });
  }
  return (
    <OnBoard title="Reset Password">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input type="number" id="token" hidden {...register("token")} />
        <div className="hidden">
          <label className="text-xs font-medium text-brand-850" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            disabled
            className="mt-1 border block w-full rounded-md border-brand-825 p-2 text-sm outline-none"
            {...register("email", {
              required: "Please enter your email",
            })}
          />
          {errors.email && <ErrorMessage errorText={errors.email.message} />}
        </div>

        <div className="relative">
          <label
            className="text-xs font-medium text-brand-850"
            htmlFor="password"
          >
            Password
          </label>
          <input
            type={openPassword ? "text" : "password"}
            id="password"
            disabled={isUpdatingPassword}
            className="mt-1 border block w-full rounded-md border-brand-825 p-2 text-sm outline-none"
            {...register("password", {
              required: "Please enter your password",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          <span
            className="absolute top-[35px] right-5 cursor-pointer"
            onClick={() => setOpenPassword((prev) => !prev)}
          >
            {openPassword ? (
              <VscEyeClosed color="#a8a1a1" />
            ) : (
              <VscEye color="#a8a1a1" />
            )}
          </span>
          {errors.password && (
            <ErrorMessage errorText={errors.password.message} />
          )}
        </div>

        <div className="relative">
          <label
            className="text-xs font-medium text-brand-850"
            htmlFor="confirm_password"
          >
            Confirm Password
          </label>
          <input
            type={openConfirm ? "text" : "password"}
            id="confirm_password"
            disabled={isUpdatingPassword}
            className="mt-1 border block w-full rounded-md border-brand-825 p-2 text-sm outline-none"
            {...register("confirm_password", {
              required: "Please confirm your password",
              validate: (value) => {
                const password = getValues("password");
                return value === password || "Passwords do not match";
              },
            })}
          />
          <span
            className="absolute top-[35px] right-5 cursor-pointer"
            onClick={() => setConfirm((prev) => !prev)}
          >
            {openConfirm ? (
              <VscEyeClosed color="#a8a1a1" />
            ) : (
              <VscEye color="#a8a1a1" />
            )}
          </span>
          {errors.confirm_password && (
            <ErrorMessage errorText={errors.confirm_password.message} />
          )}
        </div>

        <FormBtn disabled={isUpdatingPassword}>
          {isUpdatingPassword ? <SpinnerMini /> : "Reset"}
        </FormBtn>
      </form>
    </OnBoard>
  );
}

export default UpdatePassword;
