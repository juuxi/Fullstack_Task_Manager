import axios from 'axios';
class ApiError extends Error {
    status;
    constructor(status, message, options) {
        super(message, options);
        this.status = status;
    }
}
class ApiClient {
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
}
const my_config = {
    baseUrl: 'http://localhost:8000',
    headers: { 'Content-Type': 'application/json' },
};
const client = new ApiClient(my_config);
try {
    await client.post('/api/tasks/', { id: 9, title: "Clean up", completed: false });
    await client.patch('/api/tasks/1/', { title: "Do the dishes" });
    const tasks = await client.get('/api/tasks/');
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
//# sourceMappingURL=api_reader.js.map