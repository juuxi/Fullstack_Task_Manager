export class ApiError extends Error {
    status;
    constructor(status, message, options) {
        super(message, options);
        this.status = status;
    }
}
//# sourceMappingURL=types.js.map