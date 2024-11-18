const errorHandler = (error, request, response, next) => {
    const { statusCode = 500, message } = error;
    return response
        .status(statusCode)
        .send({
            message: statusCode === 500
                ? 'Ocorreu um erro no servidor'
                : message
        });
};

module.exports = errorHandler;
