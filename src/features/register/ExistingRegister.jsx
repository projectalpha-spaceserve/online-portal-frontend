import { useState } from "react";
import { useForm } from "react-hook-form";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { useLocation } from "react-router-dom";
import FormBtn from "../../components/FormBtn";
import OnBoard from "../../components/OnBoard";
import SpinnerMini from "../../components/SpinnerMini";
import { useExistingRegister } from "./useExistingRegister";
import ErrorMessage from "../../components/ErrorMessage";

function ExistingRegister() {
  const customerId = sessionStorage.getItem("customer_id");
  const location = useLocation();
  const { existingRegisterUser, isExistingRegistering } = useExistingRegister();
  const [openPassword, setOpenPassword] = useState(false);
  const [openConfirm, setConfirm] = useState(false);

  const { email, otp } = location.state || {};

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: email,
      otp: otp,
      customer_id: customerId,
    },
    mode: "onChange",
  });

  function onSubmit(data) {
    const { confirm_password, terms, privacy, indemnity, ...payload } = data;
    // console.log(payload);
    existingRegisterUser(payload, { onSettled: () => reset() });
  }
  return (
    <OnBoard title="Register">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input type="number" id="otp" hidden {...register("otp")} />

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
            disabled={isExistingRegistering}
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
            disabled={isExistingRegistering}
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

        <div>
          <div className="flex items-start gap-2 mt-3">
            <input
              type="checkbox"
              id="terms"
              className="mt-1 accent-[#a62629]"
              {...register("terms", {
                required: "You must accept the terms and conditions",
              })}
            />

            <label htmlFor="terms" className="text-xs text-gray-600">
              I/We have read and I/We agree to the{" "}
              <a
                href="https://www.samtlng.com/terms-and-condition"
                target="_blank"
                className="font-semibold"
              >
                Terms and Conditions Agreement
              </a>
            </label>
          </div>

          {errors.terms && <ErrorMessage errorText={errors.terms.message} />}
        </div>

        <div>
          <div className="flex items-start gap-2 mt-3">
            <input
              type="checkbox"
              id="privacy"
              className="mt-1 accent-[#a62629]"
              {...register("privacy", {
                required: "You must accept the data privacy agreement",
              })}
            />

            <label htmlFor="privacy" className="text-xs text-gray-600">
              I/We have read and I/We agree to the{" "}
              <a
                href="https://www.samtlng.com/privacy-policy"
                target="_blank"
                className="font-semibold"
              >
                Data Privacy Agreement
              </a>
            </label>
          </div>

          {errors.privacy && (
            <ErrorMessage errorText={errors.privacy.message} />
          )}
        </div>

        <div>
          <div className="flex items-start gap-2 mt-3">
            <input
              type="checkbox"
              id="indemnity"
              className="mt-1 accent-[#a62629]"
              {...register("indemnity", {
                required: "You must accept the email indemnity agreement",
              })}
            />

            <label htmlFor="indemnity" className="text-xs text-gray-600">
              I/We have read and I/We agree to the{" "}
              <a
                href="https://sterlingassetng-my.sharepoint.com/:b:/g/personal/it_sterlingassetng_com2/IQBT77gNY84yQb2_uF8trab9Af3npEiXhN1QMUipChs3j0s?e=FdLcfG"
                target="_blank"
                className="font-semibold"
              >
                Email Indemnity Agreement
              </a>
            </label>
          </div>

          {errors.indemnity && (
            <ErrorMessage errorText={errors.indemnity.message} />
          )}
        </div>

        <FormBtn disabled={isExistingRegistering}>
          {isExistingRegistering ? <SpinnerMini /> : "Register"}
        </FormBtn>
      </form>
    </OnBoard>
  );
}

export default ExistingRegister;
