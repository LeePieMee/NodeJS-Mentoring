import {Router} from 'express';
import {IUser, ListQueryParams} from '../types';
import {updateUserValidation, createUserValidation} from '../validators/user';
import {UserServices} from '../services/userServices';
import {UserData} from '../dataAccess/userData';

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

    constructor() {
        super();
        this.create();
        this.getAuthorizedUserList();
        this.nestedRoures();
    }

    private create() {
        this.router.post(UserController.baseUrl, createUserValidation, async (req, res) => {
            const userData = req.body as IUser;
            try {
                const user = await UserServices.createUser(userData);

                res.status(200).json(user);
            } catch (e) {
                res.status(500).json({message: e});
            }
        });
    }

    private getAuthorizedUserList() {
        this.router.get<any, any, any, ListQueryParams>('/getAutorizedUser', async (req, res) => {
            const {search, limit} = req.query;

            const users = await UserData.searchUsers(search, limit);
            res.status(200).json(users);
        });
    }

    private nestedRoures() {
        this.router
            .route(`${UserController.baseUrl}/:id`)
            .get(async (req, res) => {
                const userId = req.params.id;

                const user = await UserData.get(userId);

                res.status(200).json(user);
            })
            .delete(async (req, res) => {
                const userId = req.params.id;

                await UserData.delete(userId);

                res.status(200).json({message: `User with id ${userId} was deleted`});
            })
            .post(updateUserValidation, async (req, res) => {
                const userId = req.params.id;
                const userPayload = req.body;

                await UserData.update({id: userId, ...userPayload});

                res.status(200).json({message: `User was changed`});
            });
    }
}
