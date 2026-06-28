import { ApiTaskClient } from './HttpClient.js'
import type { ApiConfig } from './HttpClient.js'
import { ApiError } from './types.js'
import type { Task } from './types.js'
import { TaskList } from './TaskList.js'
import { TaskForm } from './TaskForm.js'


async function updateTasks(task_list: TaskList, task_form: TaskForm) {
    const tasks: Task[] = await client.get<Task[]>('/api/tasks/');
    task_list.task_list = tasks;
    task_list.render();

    let change_buttons = document.querySelectorAll<HTMLButtonElement>('.change-button');
    change_buttons.forEach(async button => {
        button.addEventListener('click', async () => {
            task_form.render();
            await client.patch<Task>(`/api/tasks/${button.dataset.index}/`, { title: "Do the dishes" });
            await updateTasks(task_list, task_form);
        });
    });

    let delete_buttons = document.querySelectorAll<HTMLButtonElement>('.delete-button');
    delete_buttons.forEach(async button => {
        button.addEventListener('click', async () => {
            await client.delete<Task>(`/api/tasks/${button.dataset.index}/`);
            await updateTasks(task_list, task_form);
        });
    });
}


const my_config: ApiConfig = {
    baseUrl: 'http://localhost:8000',
    headers: {'Content-Type': 'application/json'},
}


const client: ApiTaskClient = new ApiTaskClient(my_config);
try {
    let header = document.createElement('h3');
    header.innerText = "Tasks fetched";
    document.querySelector('h1')?.after(header);
    let tl: TaskList = new TaskList(header);
    //await client.patch<Task>('/api/tasks/1/', { title: "Do the dishes" });
    //await client.put<Task>('/api/tasks/1/', { title: "Do the dishes PUT", completed: false });
    //await client.delete<Task>('/api/tasks/1/', { title: "Do the dishes PUT", completed: false });
    let plus_button = document.querySelector('.plus-button') as HTMLButtonElement;
    plus_button.addEventListener('click', async () => {
        tf.render();
        await client.post<Task>('/api/tasks/', { title: "Clean up", completed: "pending" });
        await updateTasks(tl, tf);
    });

    let tf: TaskForm = new TaskForm();
    let modalSaveButton = document.querySelector('.modal button[type="submit"]') as HTMLButtonElement;
    modalSaveButton.addEventListener('click', async () => {
        tf.hide();
    });

    await updateTasks(tl, tf);
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
