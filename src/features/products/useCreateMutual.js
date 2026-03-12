import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createMutual as createMutualApi } from "../../services/apiMutual";
import { useNavigate } from "react-router-dom";

export function useCreateMutual() {
  const token = localStorage.getItem("auth_token");
  const navigate = useNavigate();

  const { mutate: createMutual, isPending: isCreateMutual } = useMutation({
    mutationFn: (data) => createMutualApi(token, data),

    onSuccess: () => {
      toast.success("Investment created successfully");

      navigate("/mutual-funds");
    },

    onError: (error) => {
      toast.error(error.message || "Failed to create investment");
    },
  });

  return { createMutual, isCreateMutual };
}
