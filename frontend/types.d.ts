export interface Task {
    id: number;
    title: string;
    completed: ("pending" | "done" | "in-progress");
}
export declare class ApiError extends Error {
    status: number;
    constructor(status: number, message?: string, options?: ErrorOptions);
}
//# sourceMappingURL=types.d.ts.map