import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { registerExistingCustomer } from "../../services/apiRegister";

export function useExistingRegister() {
  const navigate = useNavigate();
  const { mutate: existingRegisterUser, isPending: isExistingRegistering } =
    useMutation({
      mutationFn: (data) => registerExistingCustomer(data),
      onSuccess: () => {
        toast.success("Registration successful! You can now log in.");
        navigate("/login");
      },
      onError: (err) => toast.error(err.message || "Registration failed"),
    });

  return { existingRegisterUser, isExistingRegistering };
}
