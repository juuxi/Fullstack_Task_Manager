import axios from 'axios'
import type {AxiosInstance, AxiosRequestConfig} from 'axios'
import { ApiError } from './types.js'
import type { Task } from './types.js'

export interface ApiConfig {
    baseUrl: string;
    headers?: Record<string, string>;
}

export class ApiTaskClient {
    client: AxiosInstance;

    constructor(_config: ApiConfig) {
        const config: AxiosRequestConfig = {
            baseURL: _config.baseUrl,
            timeout: 5000,
            ...(_config.headers ? { headers: _config.headers } : {}),
        };

        this.client = axios.create(config);
    }

    public async get<T>(url: string, params?: Record<string, any>): Promise<T> {
        let response;
        try {
            response = await this.client.get<T>(url, { params });
        } catch(e: any) {
            throw new ApiError(e.response.status, e.response.data.detail);
        }
        return response.data;
    }
    public async post<T>(url: string, data: Omit<Task, 'id'>, params?: Record<string, any>): Promise<T> {
        let response;
        try {
            response = await this.client.post<T>(url, data, { params });
        } catch(e: any) {
            throw new ApiError(e.response.status, e.response.data.detail);
        }
        return response.data;
    }
    public async put<T>(url: string, data: Omit<Task, 'id'>, params?: Record<string, any>): Promise<T> {
        let response;
        try {
            response = await this.client.put<T>(url, data, { params });
        } catch(e: any) {
            throw new ApiError(e.response.status, e.response.data.detail);
        }
        return response.data;
    }
    public async patch<T>(url: string, data: Pick<Task, 'title'>, params?: Record<string, any>): Promise<T> {
        let response;
        try {
            response = await this.client.patch<T>(url, data, { params });
        } catch(e: any) {
            throw new ApiError(e.response.status, e.response.data.detail);
        }
        return response.data;
    }
    public async delete<T>(url: string, params?: Record<string, any>): Promise<T> {
        let response;
        try {
            response = await this.client.delete<T>(url, { params });
        } catch(e: any) {
            throw new ApiError(e.response.status, e.response.data.detail);
        }
        return response.data;
    }
}