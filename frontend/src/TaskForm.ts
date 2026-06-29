import type { renderable } from './types.js'

export class TaskForm implements renderable {
    private modalDiv: HTMLDivElement;
    private formElement: HTMLFormElement;
    private inputElements: HTMLElement[];
    
    constructor() {
        let divElement = document.createElement('div');
        divElement.classList.add('modal');
        divElement.classList.add('hidden');
        document.body.appendChild(divElement);
        this.modalDiv = divElement;

        this.formElement = document.createElement('form');
        this.modalDiv.appendChild(this.formElement);

        this.inputElements = [];
        let titleLabel = document.createElement('label');
        titleLabel.innerText = 'Title: ';
        titleLabel.setAttribute('for', 'title');
        let titleInput = document.createElement('input');
        titleInput.type = 'text';
        titleInput.id = 'title';
        this.inputElements.push(titleLabel);
        this.inputElements.push(titleInput);

        let statusLabel = document.createElement('label');
        statusLabel.innerText = 'Status: ';
        statusLabel.setAttribute('for', 'status');
        let statusInput = document.createElement('select');
        statusInput.id = 'status';
        let statusPendingOption = document.createElement('option');
        statusPendingOption.value = 'pending';
        statusPendingOption.innerText = 'pending';
        statusInput.appendChild(statusPendingOption);
        let statusDoneOption = document.createElement('option');
        statusDoneOption.value = 'done';
        statusDoneOption.innerText = 'done';
        statusInput.appendChild(statusDoneOption);
        let statusInProgressOption = document.createElement('option');
        statusInProgressOption.value = 'in-progress';
        statusInProgressOption.innerText = 'in-progress';
        statusInput.appendChild(statusInProgressOption);
        this.inputElements.push(statusLabel);
        this.inputElements.push(statusInput);

        let submitButton = document.createElement('button');
        submitButton.type = 'submit';
        submitButton.innerText = 'Save';
        this.inputElements.push(submitButton);

        this.inputElements.forEach(elem => this.formElement.appendChild(elem));
    }

    public render(): void {
        this.modalDiv.classList.remove('hidden');
    }

    public hide(): void {
        this.modalDiv.classList.add('hidden');
    }

    public get form(): HTMLFormElement {
        return this.formElement;
    }

    public get data(): Record<string, string>[] {
        let result:  Record<string, string>[] = [];
        this.inputElements.forEach(elem => {
            if(elem.id == 'title' && elem instanceof HTMLInputElement)
                result.push( {'title': `${elem.value}`} );
            else if(elem.id == 'status' && elem instanceof HTMLSelectElement)
                result.push( {'status': `${elem.value}`} );
        });
        return result;
    }

    public set data(data: Record<string, string>[]) {
        for (let i in data) {
            this.inputElements.forEach(elem => {
                if(data[i] && 'title' in data[i] && elem.id == 'title' && elem instanceof HTMLInputElement) {
                    elem.value = data[i]['title']
                }
                else if(data[i] && 'status' in data[i] && elem.id == 'status' && elem instanceof HTMLSelectElement) {
                    elem.value = data[i]['status']
                }
            });
        }
    }
}