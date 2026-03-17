import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { switchAccounts as switchAccountsApi } from "../../services/apiProfile";
import { useNavigate } from "react-router-dom";

export function useSwitchAccounts() {
  const navigate = useNavigate();
  const token = localStorage.getItem("auth_token");
  const queryClient = useQueryClient();

  const { mutate: switchAccounts, isPending: isSwitchAccounts } = useMutation({
    mutationFn: (customerId) =>
      switchAccountsApi(token, { symplus_id: customerId }),

    onSuccess: (_, account) => {
      queryClient.invalidateQueries();
      console.log(account, "account");
      queryClient.setQueryData(["selectedAccount"], account);
      // 🔥 Refetch logged in user
      toast.success("Account switched successfully");
      navigate("/");
    },

    onError: (error) => {
      toast.error(error.message || "Failed to switch accounts");
    },
  });

  return { switchAccounts, isSwitchAccounts };
}
