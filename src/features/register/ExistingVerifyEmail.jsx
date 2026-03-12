import { useForm } from "react-hook-form";
import { useExistingVerifyEmail } from "./useExistingVerifyEmail";
import { Link } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage";
import FormBtn from "../../components/FormBtn";
import { useExistingLinkedAccount } from "./useExistingLinkedAccount";
import { useEffect } from "react";

function ExistingVerifyEmail() {
  const { fetchLinkedAccount, linkedAccounts, isLoadingLinkedAccounts } =
    useExistingLinkedAccount();
  const { existingVerifyEmail, isExistingVerifyingEmail } =
    useExistingVerifyEmail();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const email = watch("email");

  useEffect(() => {
    if (email && /\S+@\S+\.\S+/.test(email)) {
      fetchLinkedAccount({ email });
    }
  }, [email, fetchLinkedAccount]);

  function onSubmit(data) {
    const payload = {
      email: data.email,
    };

    existingVerifyEmail(payload, {
      onSettled: () => reset(),
    });
  }
  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label className="text-xs font-medium text-brand-850" htmlFor="email">
          Email
        </label>
        <input
          type="email"
          id="email"
          // defaultValue="pry263@nzzneuyyy.ccc"
          disabled={isExistingVerifyingEmail}
          className="mt-1 border block w-full rounded-md border-brand-825 p-2 text-sm outline-none"
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
      <div>
        <label className="text-xs font-medium text-brand-850">
          Investment Account
        </label>
        <select
          disabled={isLoadingLinkedAccounts}
          className="mt-1 border block w-full rounded-md border-brand-825 p-2 text-xs md:text-sm outline-none"
          {...register("customer_id", {
            required:
              "Please select the investment account you want to log in to.",
            onChange: (e) => {
              sessionStorage.setItem("customer_id", e.target.value);
            },
          })}
        >
          <option value="">Select</option>
          {linkedAccounts.map((account, i) => (
            <option value={account.CUSTOMER_ID} key={i}>
              {account.CUSTOMER_NAME}
            </option>
          ))}
          {linkedAccounts.length < 1 && (
            <option disabled>No account found</option>
          )}
        </select>
        {errors.customer_id && (
          <ErrorMessage errorText={errors.customer_id.message} />
        )}
      </div>
      <FormBtn disabled={isExistingVerifyingEmail}>
        {isExistingVerifyingEmail ? "Verifying..." : "Verify Email"}
      </FormBtn>
      <div className="flex items-center justify-center mt-4 text-xs gap-2">
        <p>Already have an account?</p>
        <Link to="/login" className="text-brand-400 font-medium underline">
          Login
        </Link>
      </div>
    </form>
  );
}

export default ExistingVerifyEmail;
