import { useQuery } from "@tanstack/react-query";
import { getProfileDashboard } from "../../services/apiProfile";

export function useProfileDashboard() {
  const token = localStorage.getItem("auth_token");

  const {
    isPending: isLoading,
    data: profileDashboard = {},
    error,
  } = useQuery({
    queryKey: ["profileDashboard"],
    queryFn: () => getProfileDashboard(token),
  });

  return { isLoading, profileDashboard, error };
}
