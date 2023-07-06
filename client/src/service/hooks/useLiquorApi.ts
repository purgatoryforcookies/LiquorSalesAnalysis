import { QueryFunction, useQuery } from "react-query"
import { TLiquorSearchResults } from "../types"
import { AxiosError } from "axios"




export const useLiquorApi = (queryKey:[string, string|number], 
    queryFn:QueryFunction<TLiquorSearchResults>) => {


    const { data, isError, error, isLoading } = useQuery<TLiquorSearchResults, AxiosError>({
        queryKey: queryKey,
        queryFn: queryFn,
        keepPreviousData: true,
        staleTime: 5000,
        enabled: !!queryKey[1]
    })

    return { data, isError, error, isLoading } as const


}









