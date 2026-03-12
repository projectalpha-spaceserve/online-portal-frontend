import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { existingCustomerLinkedAccount } from "../../services/apiRegister";

export function useExistingLinkedAccount() {
  const { mutate, data, isPending } = useMutation({
    mutationFn: (data) => existingCustomerLinkedAccount(data),
    onError: (err) =>
      toast.error(err.message || "Failed to fetch linked accounts"),
  });

  return {
    fetchLinkedAccount: mutate,
    linkedAccounts: data || [],
    isLoadingLinkedAccounts: isPending,
  };
}
