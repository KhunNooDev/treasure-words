import useSWR from "swr";
import { apiUtils } from "./apiUtils";
import { AxiosError } from "axios";

export const useAxiosSWR = <T>(endpoint: string): { data: T; error: AxiosError<unknown, any> | null; isLoading: boolean } => {
  const { data, error, isValidating } = useSWR<T>(endpoint, apiUtils.getData);

  return {
    data: data as T, // Type assertion here
    error,
    isLoading: isValidating,
  };
};