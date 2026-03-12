import { useState } from "react";
import Btn from "../../components/Btn";
import BtnOutline from "../../components/BtnOutline";
import { useForm } from "react-hook-form";
import ErrorMessage from "../../components/ErrorMessage";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { usePassword } from "./usePassword";

function ChangePassword() {
  const { updatePassword, isUpdatingPassword } = usePassword();
  const [openPassword, setOpenPassword] = useState(false);
  const [openConfirm, setConfirm] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  function onSubmit(data) {
    const { confirm_password, ...payload } = data;
    updatePassword(payload, { onSettled: () => reset() });
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="">
          <label
            id="old_password"
            className="text-xs font-medium text-brand-850"
          >
            Current Password:
          </label>
          <input
            type="text"
            id="old_password"
            disabled={isUpdatingPassword}
            className="mt-1 border block w-full rounded-md border-brand-825 p-2 text-sm outline-none"
            {...register("old_password", {
              required: "Please enter your current password",
            })}
          />
          {errors.old_password && (
            <ErrorMessage errorText={errors.old_password.message} />
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-5">
          <div className="relative">
            <label
              className="text-xs font-medium text-brand-850"
              htmlFor="new_password"
            >
              New Password
            </label>
            <input
              type={openPassword ? "text" : "password"}
              id="new_password"
              disabled={isUpdatingPassword}
              className="mt-1 border block w-full rounded-md border-brand-825 p-2 text-sm outline-none"
              {...register("new_password", {
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
            {errors.new_password && (
              <ErrorMessage errorText={errors.new_password.message} />
            )}
          </div>

          <div className="relative">
            <label
              className="text-xs font-medium text-brand-850"
              htmlFor="confirm_password"
            >
              Confirm New Password
            </label>
            <input
              type={openConfirm ? "text" : "password"}
              id="confirm_password"
              disabled={isUpdatingPassword}
              className="mt-1 border block w-full rounded-md border-brand-825 p-2 text-sm outline-none"
              {...register("confirm_password", {
                required: "Please confirm your password",
                validate: (value) => {
                  const password = getValues("new_password");
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
        </div>
        <div className="flex gap-5 items-center justify-end pt-5">
          <BtnOutline disabled={isUpdatingPassword} onClick={() => reset()}>
            Cancel
          </BtnOutline>
          <Btn disabled={isUpdatingPassword}>
            {isUpdatingPassword ? "Updating..." : "Update Password"}
          </Btn>
        </div>
      </form>
    </div>
  );
}

export default ChangePassword;
