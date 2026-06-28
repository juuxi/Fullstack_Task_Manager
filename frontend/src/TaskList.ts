import type { Task } from './types.js'

export class TaskList {
    private listElement: HTMLUListElement;

    constructor(element_before: HTMLElement) {
        let element = document.createElement('ul');
        element_before.after(element);

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