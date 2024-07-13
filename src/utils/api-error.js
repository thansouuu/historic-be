class ApiError extends Error {
    constructor(statusCode, message, isInternal = true, stack = '') {
        super(message);

        this.statusCode = statusCode;
        this.isInternal = isInternal;

        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export default ApiError;
