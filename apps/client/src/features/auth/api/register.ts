import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { z } from "zod";

export const schemaRegister = z
  .object({
    name: z.string().min(3, "Must be at least 3 characters long"),
    email: z.string().email(),
    password: z
      .string()
      .min(7, { message: "Must be at least 7 characters long" })
      .regex(/\d/, { message: "Must contain at least one number" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
export type SchemaRegister = z.infer<typeof schemaRegister>;

const register = (data: SchemaRegister) => api.post("/auth/register", data);

export const useRegister = ({
  mutationConfig,
}: {
  mutationConfig?: MutationConfig<typeof register>;
}) => {
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    mutationFn: register,
    onSuccess: (...args) => {
      toast.success("User has been created. You can now log in");
      onSuccess?.(...args);
    },
    ...restConfig,
  });
};
