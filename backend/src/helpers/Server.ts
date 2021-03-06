import express, {Application} from 'express';
import {middleware} from '../middlewares';
import {groupController} from '../controllers/groupController';
import {userController} from '../controllers/userController';
import {userGroupController} from '../controllers/userGroupController';
import {handleControllerError, handleError} from './ErrorHandler';
import {authController} from '../controllers/authController';

const controllers = [userController, groupController, userGroupController, authController];

export class Server {
    private port: number;
    private application: Application;
    static controllers = controllers;
    static middleware = middleware;

    constructor(port: number) {
        this.port = port;
        this.application = express();
        this.setMiddleware();
        this.setRoutes();
        this.setErrorHandler();
    }

    setMiddleware() {
        Server.middleware.forEach((m) => this.application.use(m()));
    }

    setRoutes() {
        Server.controllers.forEach((controller) => {
            this.application.use('/', controller.router);
            controller.router.use(handleControllerError);
        });
    }

    setErrorHandler() {
        this.application.use(handleError);
    }

    listen() {
        this.application.listen(this.port);
    }
}
