import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createSecurityQuestion as createSecurityQuestionApi } from "../../services/apiProfile";
import { useNavigate } from "react-router-dom";

export function useCreateSecurityQuestion() {
  const queryClient = useQueryClient();
  const token = localStorage.getItem("auth_token");
  const navigate = useNavigate();

  const {
    mutate: createSecurityQuestion,
    isPending: isCreatingSecurityQuestion,
  } = useMutation({
    mutationFn: (data) => createSecurityQuestionApi(token, data),

    onSuccess: () => {
      toast.success("Security question created successfully.");
      queryClient.invalidateQueries(["kycStatus"]);
      navigate(-1);
    },

    onError: (error) => {
      toast.error(error.message || "Failed to create security question");
    },
  });

  return { createSecurityQuestion, isCreatingSecurityQuestion };
}
