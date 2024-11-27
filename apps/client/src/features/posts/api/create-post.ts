import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";

const createPost = (data: { content: string }) => api.post("/posts", data);

export const useCreatePost = ({
  mutationConfig,
}: {
  mutationConfig?: MutationConfig<typeof createPost>;
} = {}) => {
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    mutationFn: createPost,
    onSuccess: (...args) => {
      toast.success("Post successfully created");
      onSuccess?.(...args);
    },
    ...restConfig,
  });
};
