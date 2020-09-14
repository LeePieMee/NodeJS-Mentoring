import {Router} from 'express';

interface IController {
    router: Router;
}

export abstract class Controller implements IController {
    public router: Router;

    constructor() {
        this.router = Router();
    }
}
