import { useQuery } from "@tanstack/react-query";
import { getTitle } from "../../services/apiUtils";

export function useTitle() {
  const token = localStorage.getItem("auth_token");

  const {
    isPending: isTitlePending,
    data: title = [],
    error: titleError,
  } = useQuery({
    queryKey: ["title"],
    queryFn: () => getTitle(token),
  });

  return { isTitlePending, title, titleError };
}
