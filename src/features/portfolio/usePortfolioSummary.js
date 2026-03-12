import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { portfolioSummary as portfolioSummaryApi } from "../../services/apiTrust";

export function usePortfolioSummary() {
  const token = localStorage.getItem("auth_token");

  const { mutate: portfolioSummary, isPending: isPortfolioSummary } =
    useMutation({
      mutationFn: (id) => portfolioSummaryApi(token, id),
      onSuccess: () => {
        toast.success("Kindly check your email for your portfolio summary.");
      },
    });

  return { portfolioSummary, isPortfolioSummary };
}
