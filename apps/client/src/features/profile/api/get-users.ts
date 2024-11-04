import { api } from "@/lib/api-client";
import { QueryConfig } from "@/lib/react-query";
import { queryOptions, useQuery } from "@tanstack/react-query";

export type User = {
  id: string;
  email: string;
  name: string;
};

const getUsers = () => api.get<User[]>("/users");

const getUsersQueryOptions = () =>
  queryOptions({
    queryKey: ["users"],
    queryFn: getUsers,
  });

export const useGetUsers = ({
  queryConfig,
}: {
  queryConfig?: QueryConfig<typeof getUsersQueryOptions>;
}) => useQuery({ ...getUsersQueryOptions(), ...queryConfig });
