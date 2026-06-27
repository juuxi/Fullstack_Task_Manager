import axios from 'axios';
import { ApiError } from './types.js';
export class ApiTaskClient {
    client;
    constructor(_config) {
        const config = {
            baseURL: _config.baseUrl,
            timeout: 5000,
            ...(_config.headers ? { headers: _config.headers } : {}),
        };
        this.client = axios.create(config);
    }
    async get(url, params) {
        let response;
        try {
            response = await this.client.get(url, { params });
        }
        catch (e) {
            throw new ApiError(e.response.status, e.response.data.detail);
        }
        return response.data;
    }
    async post(url, data, params) {
        let response;
        try {
            response = await this.client.post(url, data, { params });
        }
        catch (e) {
            throw new ApiError(e.response.status, e.response.data.detail);
        }
        return response.data;
    }
    async put(url, data, params) {
        let response;
        try {
            response = await this.client.put(url, data, { params });
        }
        catch (e) {
            throw new ApiError(e.response.status, e.response.data.detail);
        }
        return response.data;
    }
    async patch(url, data, params) {
        let response;
        try {
            response = await this.client.patch(url, data, { params });
        }
        catch (e) {
            throw new ApiError(e.response.status, e.response.data.detail);
        }
        return response.data;
    }
    async delete(url, params) {
        let response;
        try {
            response = await this.client.delete(url, { params });
        }
        catch (e) {
            throw new ApiError(e.response.status, e.response.data.detail);
        }
        return response.data;
    }
}
//# sourceMappingURL=HttpClient.js.map