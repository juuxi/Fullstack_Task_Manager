import type { Task, renderable } from './types.js'

export class TaskList implements renderable {
    private listElement: HTMLUListElement;
    private tasks: Task[];

    constructor(element_before: HTMLElement) {
        let element = document.createElement('ul');
        element_before.after(element);

        this.listElement = element;
        this.tasks = [];
    }

    public render(): void {
        this.listElement.innerHTML = this.tasks
          .map((task) => `
            <li>
              <p>Title: ${task.title}</p>
              <p>Status: ${task.completed}</p>
              <button class="change-button" data-index="${task.id}">Change</button>
              <button class="delete-button" data-index="${task.id}">Delete</button>
            </li>
          `)
          .join('');
    }

    public set task_list(tasks: Task[]) {
        this.tasks = tasks;
    }
}