import winston from 'winston';
import express from 'express';

export const Logger = winston.createLogger({
    levels: winston.config.npm.levels,
    format: winston.format.combine(
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss',
        }),
        winston.format.errors({stack: true}),
        winston.format.splat(),
        winston.format.json(),
    ),
    transports: [new winston.transports.Console()],
});

export const handleError: express.ErrorRequestHandler = (error, _request, response, next) => {
    response.status(error.status || 500).json(error);
    next();
};

export class ControllerError {
    constructor(public name: string, public method: string | null, public error: any) {}
}

class ServerError extends Error {
    constructor(public status: number, public message: string, public ext?: object) {
        super();
    }
}

export const handleControllerError: express.ErrorRequestHandler = (error: any, request, _response, next) => {
    if (error instanceof ControllerError) {
        const message = error.error.message;
        const status = error.error.status;
        const controller = error.name;
        const method = error.method;

        Logger.warn(`${controller}.${method} [${request.originalUrl}]`);

        next(new ServerError(status, message, {controller, method, url: request.originalUrl}));
    } else {
        next(error);
    }
};
