import { queryOptions, useQuery } from "@tanstack/react-query";
import {
  api,
  ApiResponseWithPagination,
  PaginationParams,
} from "@/lib/api-client";
import { QueryConfig } from "@/lib/react-query";
import { User } from "@/features/profile/api/get-users";

type TPost = {
  id: number;
  content: string;
  created_at: string;
  user: Pick<User, "name" | "id" | "profile_picture">;
};

export type PostsResponse = ApiResponseWithPagination<TPost>;

const getPosts = ({ pagination }: { pagination: PaginationParams }) =>
  api.get<PostsResponse>("/posts", {
    params: pagination,
  });

const getPostsQueryOptions = (props: { pagination: PaginationParams }) =>
  queryOptions({
    queryKey: ["posts", props],
    queryFn: () => getPosts(props),
  });

export type TUseGetPostsOptions = {
  pagination: PaginationParams;
  queryConfig?: QueryConfig<typeof getPostsQueryOptions>;
};
export const useGetPosts = ({ pagination, queryConfig }: TUseGetPostsOptions) =>
  useQuery({
    ...getPostsQueryOptions({ pagination }),
    ...queryConfig,
  });
