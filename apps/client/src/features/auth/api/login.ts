import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { z } from "zod";

export const schemaLogin = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type SchemaLogin = z.infer<typeof schemaLogin>;

const login = (data: SchemaLogin) => api.post("/auth/login", data);

export const useLogin = ({
  mutationConfig,
}: {
  mutationConfig?: MutationConfig<typeof login>;
}) => {
  const { push } = useRouter();
  const { onSuccess, ...restConfig } = mutationConfig || {};
  return useMutation({
    mutationFn: login,
    onSuccess: (...args) => {
      toast.success("Login successful");
      push("/auth");
      onSuccess?.(...args);
    },
    ...restConfig,
  });
};
