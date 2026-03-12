import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getProfile } from "../../services/apiProfile";

export function useUser() {
  const queryClient = useQueryClient();
  let token =
    queryClient.getQueryData(["token"]) || localStorage.getItem("auth_token");

  const { isPending, data, error } = useQuery({
    queryKey: ["user", token],
    queryFn: () => getProfile(token),
    enabled: !!token,
    retry: false,
    onError: () => {
      localStorage.removeItem("auth_token");
      // localStorage.removeItem("role");
      queryClient.removeQueries(["token"]);
    },
  });

  return {
    isPending,
    user: data?.data,
    error,
    isAuthenticated: !!data?.data,
  };
}
