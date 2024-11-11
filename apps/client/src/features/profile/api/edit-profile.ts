import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { z } from "zod";
import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";

export const schemaEditProfile = z.object({
  name: z.string().min(1, "Must be at least 1 character long"),
  profilePicture: z.instanceof(File).optional(),
});
export type SchemaEditProfile = z.infer<typeof schemaEditProfile> & {
  initialProfilePicture?: string | null;
};

const updateProfile = (data: SchemaEditProfile) => {
  const formData = new FormData();
  if (data.name) {
    formData.append("name", data.name);
  }
  if (data.profilePicture)
    formData.append("profilePicture", data.profilePicture);

  return api.patch("/users/me", formData, {
    isJSON: false,
    headers: {
      Accept: "multipart/form-data",
    },
  });
};

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
