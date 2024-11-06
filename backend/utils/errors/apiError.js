class BadRequestError extends Error {
    constructor({message, statusCode}) {
        super(message);
        this.statusCode = statusCode;
    }
};

class NotFoundError extends Error {
    constructor({ message, statusCode }) {
        super(message);
        this.statusCode = statusCode;
    }
};

class UnauthorizedError extends Error {
    constructor({message, statusCode}) {
        super(message);
        this.statusCode = statusCode;
    }
};

module.exports = {BadRequestError, NotFoundError, UnauthorizedError}