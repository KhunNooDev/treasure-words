import axios, { AxiosResponse, AxiosError } from "axios";
import { NextRequest, NextResponse } from 'next/server'
import { dataUtils } from "./dataUtils";

const apiBaseUrl = '/api'; // Update this to match your API base URL

type dataApi<T> = { success: boolean, data: T, error: string };
type paramsTypes = { [key: string]: string | number | Blob | null }

interface ApiUtils {
  getParams(req: NextRequest): Promise<paramsTypes>;
  getData: <T>(endpoint: string, params?: Record<string, any>) => Promise<T>;
  postData: <T>(endpoint: string, params?: Record<string, any>) => Promise<T>;
}

export const apiUtils: ApiUtils = {
  getParams: async (req: NextRequest) => {
    let queryParams: paramsTypes = {};

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
  const object: paramsTypes = {};

  formData.forEach((value, key) => {
    object[key] = dataUtils.isBlob(value) ? value : value;
  });

  return object;
}