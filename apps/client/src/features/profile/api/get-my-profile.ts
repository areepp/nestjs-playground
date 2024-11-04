import { api } from "@/lib/api-client";
import { QueryConfig } from "@/lib/react-query";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { User } from "./get-users";

const getMyProfile = () => api.get<User>("/users/me");

const getUsersQueryOptions = () =>
  queryOptions({
    queryKey: ["my-profile"],
    queryFn: getMyProfile,
  });

export const useGetMyProfile = ({
  queryConfig,
}: {
  queryConfig?: QueryConfig<typeof getUsersQueryOptions>;
}) => useQuery({ ...getUsersQueryOptions(), ...queryConfig });
