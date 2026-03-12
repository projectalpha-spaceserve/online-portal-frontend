import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { complaints as complaintsApi } from "../../services/apiProfile";

export function useComplaints() {
  const token = localStorage.getItem("auth_token");

  const { mutate: complaints, isPending: isComplaints } = useMutation({
    mutationFn: (data) => complaintsApi(token, data),

    onSuccess: () => {
      toast.success("Submitted successfully!");
    },

    onError: (error) => {
      toast.error(error.message || "Failed to submit");
    },
  });

  return { complaints, isComplaints };
}
