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
            await waitForFormSubmit(task_form);
            let title = '';
            let status: 'pending' | 'done' | 'in-progress' = 'pending';
            task_form.data.forEach(record => {
                if ('title' in record)
                    title = record.title;
                if ('status' in record && (record.status == 'pending' || record.status == 'done' || record.status == 'in-progress'))
                    status = record.status;
            })
            await client.put<Task>(`/api/tasks/${button.dataset.index}/`, { title: `${title}`, completed: `${status}` });
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


function waitForFormSubmit(task_form: TaskForm): Promise<void> {
    let form = task_form.form;
    return new Promise((resolve) => {
        const handler = (e: Event) => {
            e.preventDefault();
            form.removeEventListener('submit', handler);
            task_form.hide();
            resolve();
        };
        form.addEventListener('submit', handler);
    });
}


const client: ApiTaskClient = new ApiTaskClient(my_config);
try {
    let header = document.createElement('h3');
    header.innerText = 'Tasks fetched';
    document.querySelector('h1')?.after(header);
    let tl: TaskList = new TaskList(header);
    //await client.patch<Task>('/api/tasks/1/', { title: 'Do the dishes' });
    //await client.put<Task>('/api/tasks/1/', { title: 'Do the dishes PUT', completed: false });
    //await client.delete<Task>('/api/tasks/1/', { title: 'Do the dishes PUT', completed: false });
    let plus_button = document.querySelector('.plus-button') as HTMLButtonElement;
    plus_button.addEventListener('click', async () => {
        tf.render();
        await waitForFormSubmit(tf);
        let title = '';
        let status: 'pending' | 'done' | 'in-progress' = 'pending';
        tf.data.forEach(record => {
            if ('title' in record)
                title = record.title;
            if ('status' in record && (record.status == 'pending' || record.status == 'done' || record.status == 'in-progress'))
                status = record.status;
        })
        await client.post<Task>('/api/tasks/', { title: `${title}`, completed: `${status}` });
        await updateTasks(tl, tf);
    });

    let tf: TaskForm = new TaskForm();

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
