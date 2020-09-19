import express, {Application} from 'express';
import {middlewares} from '../middlewares';
import {groupController} from '../controllers/groupController';
import {userController} from '../controllers/userController';
import {userGroupController} from '../controllers/userGroupController';

const controllers = [userController, groupController, userGroupController];

export class Server {
    private port: number;
    private application: Application;
    static controllers = controllers;
    static middlewares = middlewares;

    constructor(port: number) {
        this.port = port;
        this.application = express();
        this.setMiddelwares();
        this.setRoutes();
    }

    setMiddelwares() {
        Server.middlewares.forEach((m) => this.application.use(m()));
    }

    setRoutes() {
        Server.controllers.forEach((controller) => this.application.use('/', controller.router));
    }

    listen() {
        this.application.listen(this.port);
    }
}
