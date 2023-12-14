import axios, { AxiosResponse, AxiosError } from "axios";
import { NextRequest } from 'next/server'
import { dataUtils } from "./dataUtils";
import { DataApiType } from "@/database/utils/apiResponse";

const apiBaseUrl = '/api'; // Update this to match your API base URL

type ParamsTypes = { [key: string]: string | number | Blob | null }

interface ApiUtils {
  getParams(req: NextRequest): Promise<ParamsTypes>;
  getData: <T>(endpoint: string, params?: Record<string, any>) => Promise<T>;
  postData: <T>(endpoint: string, params?: Record<string, any>) => Promise<T>;
}

export const apiUtils: ApiUtils = {
  getParams: async (req: NextRequest) => {
    let queryParams: ParamsTypes = {};

    if (req.method === 'GET') {
      const { searchParams } = new URL(req.url);

      searchParams.forEach((value, key) => {
        queryParams[key] = /^\d+$/.test(value) ? parseInt(value, 10) : value;
      });
    } else if (req.method === 'POST') {
      const contentType = req.headers.get('content-type');
      if(contentType && contentType.includes('multipart/form-data')){
        const formData = await req.formData()
        queryParams = formDataToObject(formData);        
      }else{
        const data = await req.json();
        queryParams = data;
      }
    }
    queryParams['email'] = typeof queryParams['email'] === 'string'
      ? queryParams['email']
      : queryParams['email'] !== null && queryParams['email'] !== undefined
        ? String(queryParams['email'])
        : '';
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
          const responseData = res.data as DataApiType<T>;
          const {success, data} = responseData
          if(success && data){
            resolve(data);
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
    const isFormData = data instanceof FormData;
    const headers = isFormData ? { 'Content-Type': 'multipart/form-data' } : {};

    return new Promise((resolve, reject) => {
      axios
        .post<T>(url, data, { headers })
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

const formDataToObject = (formData: FormData) => {
  const object: ParamsTypes = {};

  formData.forEach((value, key) => {
    object[key] = dataUtils.isBlob(value) ? value : value;
  });

  return object;
}