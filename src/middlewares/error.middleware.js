import { StatusCodes, getReasonPhrase } from 'http-status-codes';
import mongoose from 'mongoose';
import ApiError from '../utils/api-error.js';

export const errorConverterMiddleware = (err, req, res, next) => {
    let error = err;

    if (!(error instanceof ApiError)) {
        let statusCode =
            error.statusCode || error instanceof mongoose.Error
                ? StatusCodes.BAD_REQUEST
                : StatusCodes.INTERNAL_SERVER_ERROR;

        let message = error.message || getReasonPhrase(statusCode);

        error = new ApiError(statusCode, message, false, err?.stack);
    }

    next(error);
};

export const errorHandlerMiddleware = (err, req, res, next) => {
    let { statusCode, message, isInternal, stack } = err;

    if (process.env.NODE_ENV === 'production' && !isInternal) {
        statusCode = StatusCodes.INTERNAL_SERVER_ERROR; // 500
        message = getReasonPhrase(statusCode); // Internal Server Error
    }

    if (process.env.NODE_ENV === 'development') {
        console.log('ERROR: ', err);
    }

    res.status(statusCode || 500).json({ code: statusCode, message });
};
