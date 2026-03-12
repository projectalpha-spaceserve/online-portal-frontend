import { useQuery } from "@tanstack/react-query";
import { getRelation } from "../../services/apiUtils";

export function useRelation() {
  const token = localStorage.getItem("auth_token");

  const {
    isPending: isRelationPending,
    data: relation = [],
    error: relationError,
  } = useQuery({
    queryKey: ["relation"],
    queryFn: () => getRelation(token),
  });

  return { isRelationPending, relation, relationError };
}
