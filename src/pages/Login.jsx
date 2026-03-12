import { useState } from "react";
import { useForm } from "react-hook-form";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { Link } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import FormBtn from "../components/FormBtn";
import OnLoginPage from "../components/OnLoginPage";
import SpinnerMini from "../components/SpinnerMini";
import { useLogin } from "../features/auth/useLogin";

function Login() {
  const [password, setPassword] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { login, isPending } = useLogin();

  const onSubmit = (data) => {
    login(data, {
      onSettled: () => reset(),
    });
  };

  return (
    <OnLoginPage>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-5">
          <label className="text-sm" htmlFor="userId">
            Email Address
          </label>
          <input
            type="email"
            id="userId"
            disabled={isPending}
            // defaultValue="pry713@nzzneuyyy.ccc"
            className="border px-5 py-2 text-sm w-full rounded-sm"
            {...register("email", {
              required: "Please enter your email address",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Please enter a valid email address",
              },
            })}
          />
          {errors.email && <ErrorMessage errorText={errors.email.message} />}
        </div>
        <div className="relative">
          <label className="text-sm">Password</label>
          <input
            type={password == false ? "password" : "text"}
            id="password"
            className="border px-5 py-2 text-sm w-full rounded-sm"
            disabled={isPending}
            // defaultValue="olatunji12"
            autoComplete="current-password"
            {...register("password", {
              required: "Please enter your password",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
              // pattern: {
              //   value: /^(?=.*[!@#$%^&*(),.?":{}|<>])/,
              //   message:
              //     "Password must contain at least one special character",
              // },
            })}
          />

          <div className="absolute top-[35px] right-5">
            {password == false ? (
              <VscEye color="#a8a1a1" onClick={() => setPassword(!password)} />
            ) : (
              <VscEyeClosed
                color="#a8a1a1"
                onClick={() => setPassword(!password)}
              />
            )}
          </div>
          {errors.password && (
            <ErrorMessage errorText={errors.password.message} />
          )}
        </div>
        <Link
          to="/verify-email"
          className="flex text-xs pt-1 justify-end text-brand-400 font-medium"
        >
          Forget password
        </Link>
        <FormBtn disabled={isPending}>
          {isPending ? <SpinnerMini /> : "Login"}
        </FormBtn>
        <div className="flex items-center justify-center mt-4 text-xs gap-2">
          <p>New here?</p>
          <Link to="/register" className="text-brand-400 font-medium underline">
            Start Registration
          </Link>
        </div>
      </form>
    </OnLoginPage>
  );
}

export default Login;
