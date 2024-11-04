import { MutationConfig } from "@/lib/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useTokenStore } from "../hooks/use-token-store";
import { api } from "@/lib/api-client";

const logout = () => api.post("/auth/logout");

export const useLogout = ({
  mutationConfig,
}: {
  mutationConfig?: MutationConfig<typeof logout>;
}) => {
  const queryClient = useQueryClient();
  const updateAccessToken = useTokenStore((state) => state.updateAccessToken);
  const { onSuccess, ...restConfig } = mutationConfig || {};
  return useMutation({
    mutationFn: logout,
    onSuccess: (...args) => {
      toast.success("Logout successful");
      updateAccessToken(null);
      queryClient.removeQueries({ queryKey: ["my-profile"] });
      onSuccess?.(...args);
    },
    ...restConfig,
  });
};
