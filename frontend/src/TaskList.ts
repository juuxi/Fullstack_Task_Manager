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
          .map((task, index) => `
            <li>
              <span>${task}</span>
              <button data-index="${index}">Delete</button>
            </li>
          `)
          .join('');
    }
}