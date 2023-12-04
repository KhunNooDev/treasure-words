import axios, { AxiosResponse, AxiosError } from "axios";
import { NextRequest, NextResponse } from 'next/server'
import useSWR from "swr";

const apiBaseUrl = 'api'; // Update this to match your API base URL

interface ApiUtils {
  getParams(req: NextRequest): Promise<{ [key: string]: string | number | null }>;
  getData: <T>(endpoint: string, params?: Record<string, any>) => Promise<T>;
  postData: <T>(endpoint: string, params?: Record<string, any>) => Promise<T>;
}
type dataApi<T> = { success: boolean, data: T, error: string };

export const apiUtils: ApiUtils = {
  getParams: async (req: NextRequest) => {
    let queryParams: { [key: string]: string | number | null } = {};

    if (req.method === 'GET') {
      const { searchParams } = new URL(req.url);

      searchParams.forEach((value, key) => {
        queryParams[key] = /^\d+$/.test(value) ? parseInt(value, 10) : value;
      });
    } else if (req.method === 'POST') {
      const data = await req.json();
      queryParams = data;
    }

    return queryParams;
  },
  getData: <T>(endpoint: string, params = {}): Promise<T> => {
    const url = `${apiBaseUrl}/${endpoint}`;

    return new Promise((resolve, reject) => {
      axios
        .get<T>(url, {
          params: params,
        })
        .then((res: AxiosResponse<T>) => {
          const responseData = res.data as dataApi<T>;
          if(responseData.success){
            resolve(responseData.data);
          }else{
            reject(responseData.error);
          }
        })
        .catch((err: AxiosError) => {
          reject(err);
        });
    });
  },
  postData: <T>(endpoint: string, data: any): Promise<T> => {
    const url = `${apiBaseUrl}/${endpoint}`;

    return new Promise((resolve, reject) => {
      axios
        .post<T>(url, data)
        .then((res: AxiosResponse<T>) => {
          const responseData = res.data;
          resolve(responseData);
        })
        .catch((err: AxiosError) => {
          reject(err);
        });
    });
  },
};

export const useAxiosSWR = <T>(endpoint: string): { data: T; error: AxiosError<unknown, any> | null; isLoading: boolean } => {
  const { data, error, isValidating } = useSWR<T>(endpoint, apiUtils.getData);

  return {
    data: data as T, // Type assertion here
    error,
    isLoading: isValidating,
  };
};