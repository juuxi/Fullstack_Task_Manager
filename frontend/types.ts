export interface Task {
    id: number;
    title: string;
    completed: ("pending" | "done" | "in-progress");
}

export class ApiError extends Error {
    status: number;
    constructor(status: number, message?: string, options?: ErrorOptions) {
        super(message, options);
        this.status = status;
    }
}
