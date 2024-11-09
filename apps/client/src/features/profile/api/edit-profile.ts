import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { z } from "zod";
import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";

export const schemaEditProfile = z.object({
  name: z.string().min(1, "Must be at least 1 character long"),
  profilePicture: z.instanceof(File).nullable(),
});
export type SchemaEditProfile = z.infer<typeof schemaEditProfile>;

const updateProfile = (data: Pick<SchemaEditProfile, "name">) =>
  api.patch("/users/me", data);

export const useUpdateProfile = ({
  mutationConfig,
}: {
  mutationConfig?: MutationConfig<typeof updateProfile>;
}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    mutationFn: updateProfile,
    onSuccess: (...args) => {
      toast.success("Profile has been successfully updated");
      queryClient.invalidateQueries({ queryKey: ["my-profile"] });
      onSuccess?.(...args);
    },
    ...restConfig,
  });
};
