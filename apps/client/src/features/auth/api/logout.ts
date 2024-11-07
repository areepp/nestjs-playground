import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { useTokenStore } from "../hooks/use-token-store";

const logout = () => api.post("/auth/logout");

export const useLogout = ({
  mutationConfig,
}: {
  mutationConfig?: MutationConfig<typeof logout>;
}) => {
  const { push } = useRouter();
  const queryClient = useQueryClient();
  const updateAccessToken = useTokenStore((state) => state.updateAccessToken);
  const { onSuccess, ...restConfig } = mutationConfig || {};
  return useMutation({
    mutationFn: logout,
    onSuccess: (...args) => {
      toast.success("Logout successful");
      updateAccessToken(null);
      push("/auth/login");
      queryClient.removeQueries({ queryKey: ["my-profile"] });
      onSuccess?.(...args);
    },
    ...restConfig,
  });
};
