import express, {Application} from 'express';
import {userController} from '../controllers/userController';
import {middlewares} from '../middlewares';

const controllers = [userController];

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
