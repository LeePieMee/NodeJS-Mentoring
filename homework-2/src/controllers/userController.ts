import {Router} from 'express';
import {v4 as uuidv4} from 'uuid';
import {IUser, ListQueryParams} from '../types';
import {updateUserValidation, createUserValidation} from '../validators/user';

interface IController {
    router: Router;
}

abstract class Controller implements IController {
    public router: Router;

    constructor() {
        this.router = Router();
    }
}

export class UserController extends Controller {
    static baseUrl = '/user';
    private static users: IUser[] = [];

    constructor() {
        super();
        this.create();
        this.getAuthorizedUserList();
        this.nestedRoures();
    }

    private create() {
        this.router.post(UserController.baseUrl, createUserValidation, (req, res) => {
            const user = {...req.body, id: uuidv4(), isDeleted: false} as IUser;
            UserController.users.push(user);
            res.status(200).json(user);
        });
    }

    private getAuthorizedUserList() {
        this.router.get<any, any, any, ListQueryParams>('/getAutorizedUser', (req, res) => {
            const {search, limit} = req.query;

            const users: IUser[] = UserController.users
                .filter((u) => u.login.includes(search) && !u.isDeleted)
                .sort((user, prevUser) => user.login.localeCompare(prevUser.login))
                .slice(0, limit);

            console.log(users);
            res.status(200).json(users);
        });
    }

    private nestedRoures() {
        this.router
            .route(`${UserController.baseUrl}/:id`)
            .get((req, res) => {
                const userId = req.params.id;

                const user = UserController.users.find((i) => i.id === userId) || null;

                res.status(200).json(user);
            })
            .delete((req, res) => {
                const userId = req.params.id;

                UserController.users = UserController.users.map((u) => (u.id === userId ? {...u, isDeleted: true} : u));
                res.status(200).json({message: `User with id ${userId} was deleted`});
            })
            .post(updateUserValidation, (req, res) => {
                const userId = req.params.id;
                const userPayload = req.body;

                UserController.users = UserController.users.map((u) => (u.id === userId ? {...u, ...userPayload} : u));

                res.status(200).json({message: `User was changed`});
            });
    }
}
