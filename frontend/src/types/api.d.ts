import { AxiosInstance } from 'axios';

declare module 'axios' {
  export interface AxiosInstance {
    get<T = any>(url: string): Promise<T>;
    post<T = any>(url: string, data?: any): Promise<T>;
    put<T = any>(url: string, data?: any): Promise<T>;
    delete<T = any>(url: string): Promise<T>;
  }
} 