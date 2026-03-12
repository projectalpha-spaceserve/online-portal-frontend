import { useForm } from "react-hook-form";
import { useNewVerifyEmail } from "./useNewVerifyEmail";
import { Link } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage";
import FormBtn from "../../components/FormBtn";

function NewVerifyEmail() {
  const { newVerifyEmail, isNewVerifyingEmail } = useNewVerifyEmail();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    newVerifyEmail(data, {
      onSettled: () => reset(),
    });
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label className="text-xs font-medium text-brand-850" htmlFor="email">
          Email
        </label>
        <input
          type="email"
          id="email"
          disabled={isNewVerifyingEmail}
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
      <FormBtn disabled={isNewVerifyingEmail}>
        {isNewVerifyingEmail ? "Verifying..." : "Verify Email"}
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

export default NewVerifyEmail;
