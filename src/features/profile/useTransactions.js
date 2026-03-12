import { useQuery } from "@tanstack/react-query";
import { transactions as transactionsApi } from "../../services/apiProfile";

export function useTransactions() {
  const token = localStorage.getItem("auth_token");

  const {
    isPending: isTransactions,
    data: transactions = [],
    error,
  } = useQuery({
    queryKey: ["transactions"],
    queryFn: () => transactionsApi(token),
  });

  return { isTransactions, transactions, error };
}
