import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { switchAccounts as switchAccountsApi } from "../../services/apiProfile";

export function useSwitchAccounts() {
  const token = localStorage.getItem("auth_token");
  const queryClient = useQueryClient();

  const { mutate: switchAccounts, isPending: isSwitchAccounts } = useMutation({
    mutationFn: (customerId) =>
      switchAccountsApi(token, { symplus_id: customerId }),

    onSuccess: () => {
      // 🔥 Refetch logged in user
      queryClient.invalidateQueries();

      toast.success("Account switched successfully");
    },

    onError: (error) => {
      toast.error(error.message || "Failed to switch accounts");
    },
  });

  return { switchAccounts, isSwitchAccounts };
}
