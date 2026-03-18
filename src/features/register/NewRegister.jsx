import { useState } from "react";
import { useForm } from "react-hook-form";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { useLocation } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage";
import FormBtn from "../../components/FormBtn";
import Modal from "../../components/Modal";
import OnBoard from "../../components/OnBoard";
import SpinnerMini from "../../components/SpinnerMini";
import CustomerConsent from "./CustomerConsent";
import Privacy from "./Privacy";
import Terms from "./Terms";
import { useNewRegister } from "./useNewRegister";

function NewRegister() {
  const { newRegisterUser, isNewRegistering } = useNewRegister();
  const [openPassword, setOpenPassword] = useState(false);
  const [modalStep, setModalStep] = useState(null);
  const [openConfirm, setConfirm] = useState(false);

  const location = useLocation();

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
    },
    mode: "onChange",
  });

  function onSubmit(data) {
    const { confirm_password, terms, privacy, indemnity, ...payload } = data;
    newRegisterUser(payload, { onSettled: () => reset() });
  }

  const handleCardClick = (info) => {
    setModalStep(info);
  };

  return (
    <OnBoard title="Register">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          type="number"
          id="otp"
          hidden
          className="mt-1 border block w-full rounded-md border-brand-825 p-2 text-sm outline-none"
          {...register("otp")}
        />
        <div>
          <label
            className="text-xs font-medium text-brand-850"
            htmlFor="first_name"
          >
            First Name
          </label>
          <input
            type="text"
            id="first_name"
            disabled={isNewRegistering}
            className="mt-1 border block w-full rounded-md border-brand-825 p-2 text-sm outline-none"
            {...register("first_name", {
              required: "Please enter your first name",
              minLength: {
                value: 3,
                message: "First name must be at least 3 characters",
              },
            })}
          />
          {errors.first_name && (
            <ErrorMessage errorText={errors.first_name.message} />
          )}
        </div>
        <div>
          <label
            className="text-xs font-medium text-brand-850"
            htmlFor="last_name"
          >
            Last Name
          </label>
          <input
            type="text"
            id="last_name"
            disabled={isNewRegistering}
            className="mt-1 border block w-full rounded-md border-brand-825 p-2 text-sm outline-none"
            {...register("last_name", {
              required: "Please enter your last name",
              minLength: {
                value: 3,
                message: "Last name must be at least 3 characters",
              },
            })}
          />
          {errors.last_name && (
            <ErrorMessage errorText={errors.last_name.message} />
          )}
        </div>
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
        <div>
          <label className="text-xs font-medium text-brand-850" htmlFor="phone">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            disabled={isNewRegistering}
            className="mt-1 border block w-full rounded-md border-brand-825 p-2 text-sm outline-none"
            {...register("phone", {
              required: "Please enter your phone number",
              pattern: {
                value: /^[0-9]{10,15}$/,
                message: "Please provide a valid phone number",
              },
            })}
          />
          {errors.phone && <ErrorMessage errorText={errors.phone.message} />}
        </div>
        <div>
          <label className="text-xs font-medium text-brand-850" htmlFor="bvn">
            BVN
          </label>

          <input
            type="text"
            id="bvn"
            inputMode="numeric"
            maxLength={11}
            disabled={isNewRegistering}
            className="mt-1 border block w-full rounded-md border-brand-825 p-2 text-sm outline-none"
            {...register("bvn", {
              required: "Please enter your BVN",
              pattern: {
                value: /^[0-9]{11}$/,
                message: "BVN must be exactly 11 digits",
              },
            })}
            onInput={(e) => {
              e.target.value = e.target.value.replace(/\D/g, "").slice(0, 11);
            }}
          />

          {errors.bvn && <ErrorMessage errorText={errors.bvn.message} />}
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
            disabled={isNewRegistering}
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
            disabled={isNewRegistering}
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
          <label
            className="text-xs font-medium text-brand-850"
            htmlFor="referral_code"
          >
            Referral
          </label>

          <input
            type="text"
            id="referral_code"
            disabled={isNewRegistering}
            className="mt-1 border block w-full rounded-md border-brand-825 p-2 text-sm outline-none"
            {...register("referral_code")}
          />
          {errors.referral_code && (
            <ErrorMessage errorText={errors.referral_code.message} />
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

            <label
              htmlFor="terms"
              className="text-xs text-gray-600 leading-relaxed"
            >
              I/We have read and I/We agree to the{" "}
              <span
                role="button"
                onClick={() => handleCardClick("terms")}
                className="font-semibold"
              >
                Terms and Conditions Agreement
              </span>
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

            <label
              htmlFor="privacy"
              className="text-xs text-gray-600 leading-relaxed"
            >
              I/We have read and I/We agree to the{" "}
              <span
                role="button"
                onClick={() => handleCardClick("privacy")}
                className="font-semibold"
              >
                Data Privacy Agreement
              </span>
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
                required: "You must accept the customer's consent agreement",
              })}
            />

            <label
              htmlFor="indemnity"
              className="text-xs text-gray-600 leading-relaxed"
            >
              I/We have read and I/We agree to the{" "}
              <span
                role="button"
                onClick={() => handleCardClick("customer")}
                className="font-semibold"
              >
                Customer's Consent Agreement
              </span>
            </label>
          </div>

          {errors.indemnity && (
            <ErrorMessage errorText={errors.indemnity.message} />
          )}
        </div>

        <FormBtn disabled={isNewRegistering}>
          {isNewRegistering ? <SpinnerMini /> : "Register"}
        </FormBtn>
      </form>

      {modalStep && (
        <Modal onClose={() => setModalStep(null)}>
          {modalStep === "terms" && <Terms />}
          {modalStep === "privacy" && <Privacy />}
          {modalStep === "customer" && <CustomerConsent />}
        </Modal>
      )}
    </OnBoard>
  );
}

export default NewRegister;
