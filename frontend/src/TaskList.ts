import type { Task } from './types.js'

export class TaskList {
    private listElement: HTMLUListElement;

    constructor(containerId: string) {
        const element = document.getElementById(containerId);

        if (!element || !(element instanceof HTMLUListElement)) {
            throw new Error(`Element with id "${containerId}" is not a valid HTMLUListElement.`);
        }
        this.listElement = element;
    }

    public render(tasks: Task[]): void {
        this.listElement.innerHTML = tasks
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
}