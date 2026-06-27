import { ApiTaskClient } from './HttpClient.js';
import { ApiError } from './types.js';
const my_config = {
    baseUrl: 'http://localhost:8000',
    headers: { 'Content-Type': 'application/json' },
};
const client = new ApiTaskClient(my_config);
try {
    //await client.post<Task>('/api/tasks/', { title: "Clean up", completed: false });
    //await client.patch<Task>('/api/tasks/1/', { title: "Do the dishes" });
    //await client.put<Task>('/api/tasks/1/', { title: "Do the dishes PUT", completed: false });
    //await client.delete<Task>('/api/tasks/1/', { title: "Do the dishes PUT", completed: false });
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
//# sourceMappingURL=main.js.map