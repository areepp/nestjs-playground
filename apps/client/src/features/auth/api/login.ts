import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { z } from "zod";
import { useTokenStore } from "../hooks/use-token-store";

export const schemaLogin = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type SchemaLogin = z.infer<typeof schemaLogin>;

const login = (data: SchemaLogin) =>
  api.post<{ access_token: string }>("/auth/login", data);

export const useLogin = ({
  mutationConfig,
}: {
  mutationConfig?: MutationConfig<typeof login>;
}) => {
  const queryClient = useQueryClient();
  const { push } = useRouter();
  const updateAccessToken = useTokenStore((state) => state.updateAccessToken);
  const { onSuccess, ...restConfig } = mutationConfig || {};
  return useMutation({
    mutationFn: login,
    onSuccess: (...args) => {
      toast.success("Login successful");
      push("/auth");
      updateAccessToken(args[0].access_token);
      queryClient.invalidateQueries({ queryKey: ["my-profile"] });
      onSuccess?.(...args);
    },
    ...restConfig,
  });
};
