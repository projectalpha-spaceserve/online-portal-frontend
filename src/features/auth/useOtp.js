import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { verifyOtp as verifyOtpApi } from "../../services/apiAuth";
import { capitalize } from "../../constants/helper";

export function useOtp() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: verifyOtp, isPending: isLoadingOtp } = useMutation({
    mutationFn: (data) => verifyOtpApi(data),
    onSuccess: async (response) => {
      const { access_token, user } = response.data;

      localStorage.setItem("auth_token", access_token);

      queryClient.setQueryData(["token"], access_token);
      queryClient.setQueryData(["user", access_token], { data: user });
      await queryClient.invalidateQueries(["user"]);

      navigate("/", { replace: true });

      toast.success(`Welcome back, ${capitalize(user.first_name) || "user"}!`);
    },
    onError: (err) => toast.error(err.message),
  });

  return { verifyOtp, isLoadingOtp };
}
