import axios from 'axios'
import type {AxiosInstance, AxiosRequestConfig} from 'axios'
import type { Task } from './api_types.js'

class ApiError extends Error {
    status: number;
    constructor(status: number, message?: string, options?: ErrorOptions) {
        super(message, options);
        this.status = status;
    }
}


interface ApiConfig {
    baseUrl: string;
    headers?: Record<string, string>;
}

class ApiTaskClient {
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

const my_config: ApiConfig = {
    baseUrl: 'http://localhost:8000',
    headers: {'Content-Type': 'application/json'},
}

const client: ApiTaskClient = new ApiTaskClient(my_config);
try {
    //await client.post<Task>('/api/tasks/', { title: "Clean up", completed: false });
    //await client.patch<Task>('/api/tasks/1/', { title: "Do the dishes" });
    //await client.put<Task>('/api/tasks/1/', { title: "Do the dishes PUT", completed: false });
    //await client.delete<Task>('/api/tasks/1/', { title: "Do the dishes PUT", completed: false });
    const tasks: Task[] = await client.get<Task[]>('/api/tasks/');
    let header = document.createElement('h3');
    header.innerText = "Tasks fetched";
    document.querySelector('h1')?.after(header);
    let ul = document.createElement('ul');
    tasks.forEach(element => {
        let li = document.createElement('li');
        li.innerText = element.title;
        ul.appendChild(li);
    });
    header.after(ul);
}
catch (e) {
    if (e instanceof ApiError) {
        let error_div = document.createElement('div');
        let error_p = document.createElement('p');
        error_p.innerText = e.message;
        error_div.appendChild(error_p);
        error_div.style = 'color: red';
        document.body.appendChild(error_div);
    }
    else 
        throw e;
}
