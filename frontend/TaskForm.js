export class TaskForm {
    inputElement;
    constructor(elementId) {
        const element = document.getElementById(elementId);
        if (!element || !(element instanceof HTMLInputElement)) {
            throw new Error(`Element with id "${elementId}" is not a valid HTMLInputElement.`);
        }
        this.inputElement = element;
    }
}
//# sourceMappingURL=TaskForm.js.map