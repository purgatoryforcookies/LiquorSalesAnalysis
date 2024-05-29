import { QueryFunction, useQuery } from "react-query";
import { AxiosError } from "axios";

export const useLiquorApi = <T>(
  queryKey: [string, string | number],
  queryFn: QueryFunction<T>,
) => {
  const { data, isError, error, isLoading } = useQuery<T, AxiosError>({
    queryKey: queryKey,
    queryFn: queryFn,
    keepPreviousData: true,
    staleTime: 5000,
    enabled: !!queryKey[1],
  });

  return { data, isError, error, isLoading } as const;
};
