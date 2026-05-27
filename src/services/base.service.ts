import http from './http';
import type { ApiResponse } from '@/types/common';

export abstract class BaseService {
  protected readonly basePath: string;

  constructor(basePath: string) {
    this.basePath = basePath;
  }

  protected async get<T>(path: string): Promise<ApiResponse<T>> {
    const response = await http.get<ApiResponse<T>>(path);
    return response.data;
  }

  protected async post<T>(path: string, data?: unknown): Promise<ApiResponse<T>> {
    const response = await http.post<ApiResponse<T>>(path, data);
    return response.data;
  }

  protected async put<T>(path: string, data?: unknown): Promise<ApiResponse<T>> {
    const response = await http.put<ApiResponse<T>>(path, data);
    return response.data;
  }

  protected async patch<T>(path: string, data?: unknown): Promise<ApiResponse<T>> {
    const response = await http.patch<ApiResponse<T>>(path, data);
    return response.data;
  }

  protected async delete<T>(path: string): Promise<ApiResponse<T>> {
    const response = await http.delete<ApiResponse<T>>(path);
    return response.data;
  }
}
