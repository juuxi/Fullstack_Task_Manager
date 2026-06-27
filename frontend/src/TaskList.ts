export class TaskList {
    private listElement: HTMLUListElement;

    constructor(containerId: string) {
        const element = document.getElementById(containerId);

        if (!element || !(element instanceof HTMLUListElement)) {
            throw new Error(`Element with id "${containerId}" is not a valid HTMLUListElement.`);
        }
        this.listElement = element;
    }
}