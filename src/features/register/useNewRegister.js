import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { registerNewCustomer } from "../../services/apiRegister";
import { useNavigate } from "react-router-dom";

export function useNewRegister() {
  const navigate = useNavigate();
  const { mutate: newRegisterUser, isPending: isNewRegistering } = useMutation({
    mutationFn: (data) => registerNewCustomer(data),
    onSuccess: () => {
      toast.success("Registration successful! You can now log in.");
      navigate("/login");
    },
    onError: (err) => toast.error(err.message || "Registration failed"),
  });

  return { newRegisterUser, isNewRegistering };
}
