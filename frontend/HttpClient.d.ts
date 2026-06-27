import type { AxiosInstance } from 'axios';
import type { Task } from './types.js';
export interface ApiConfig {
    baseUrl: string;
    headers?: Record<string, string>;
}
export declare class ApiTaskClient {
    client: AxiosInstance;
    constructor(_config: ApiConfig);
    get<T>(url: string, params?: Record<string, any>): Promise<T>;
    post<T>(url: string, data: Omit<Task, 'id'>, params?: Record<string, any>): Promise<T>;
    put<T>(url: string, data: Omit<Task, 'id'>, params?: Record<string, any>): Promise<T>;
    patch<T>(url: string, data: Pick<Task, 'title'>, params?: Record<string, any>): Promise<T>;
    delete<T>(url: string, params?: Record<string, any>): Promise<T>;
}
//# sourceMappingURL=HttpClient.d.ts.map