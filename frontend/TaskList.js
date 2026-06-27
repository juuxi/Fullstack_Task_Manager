export class TaskList {
    listElement;
    constructor(containerId) {
        const element = document.getElementById(containerId);
        if (!element || !(element instanceof HTMLUListElement)) {
            throw new Error(`Element with id "${containerId}" is not a valid HTMLUListElement.`);
        }
        this.listElement = element;
    }
}
//# sourceMappingURL=TaskList.js.map