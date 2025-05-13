import { infiniteQueryOptions, useInfiniteQuery } from "@tanstack/react-query";
import { api, ApiResponseWithInfinitePagination } from "@/lib/api-client";
import { QueryConfig } from "@/lib/react-query";
import { User } from "@/features/profile/api/get-users";

type TPost = {
  id: number;
  content: string;
  created_at: string;
  user: Pick<User, "name" | "id" | "profile_picture">;
};

export type PostsResponse = ApiResponseWithInfinitePagination<TPost>;

const getPosts = (pageParam: number | undefined) =>
  api.get<PostsResponse>("/posts", {
    params: {
      cursor: pageParam === 0.1 ? undefined : pageParam,
      limit: 10,
    },
  });

const getPostsQueryOptions = () =>
  infiniteQueryOptions({
    queryKey: ["posts-infinite"],
    queryFn: (props) => getPosts(props.pageParam),
    initialPageParam: 0.1,
    getNextPageParam: (lastPage) => {
      return lastPage.meta.nextCursor ?? undefined;
    },
  });

export type TUseGetPostsOptions = {
  queryConfig?: QueryConfig<typeof getPostsQueryOptions>;
};
export const useGetPosts = ({ queryConfig }: TUseGetPostsOptions = {}) =>
  useInfiniteQuery({
    ...getPostsQueryOptions(),
    ...queryConfig,
  });
