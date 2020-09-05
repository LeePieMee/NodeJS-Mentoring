import {Router} from 'express';
import {IUser, ListQueryParams} from '../types';
import {updateUserValidation, createUserValidation} from '../validators/user';
import {UserServices} from '../services/userServices';
import {userData, UserData} from '../dataAccess/userData';

interface IController {
    router: Router;
}

abstract class Controller implements IController {
    public router: Router;

    constructor() {
        this.router = Router();
    }
}

class UserController extends Controller {
    static baseUrl = '/user';
    private data: UserData;

    constructor(data: UserData) {
        super();
        this.data = data;
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
            } catch (error) {
                res.status(500).json({message: error});
            }
        });
    }

    private getAuthorizedUserList() {
        this.router.get<any, any, any, ListQueryParams>('/getAutorizedUser', async (req, res) => {
            const {search, limit} = req.query;

            const users = await this.data.searchUsers(search, limit);
            res.status(200).json(users);
        });
    }

    private nestedRoures() {
        this.router
            .route(`${UserController.baseUrl}/:id`)
            .get(async (req, res) => {
                const userId = req.params.id;

                const user = await this.data.get(userId);

                res.status(200).json(user);
            })
            .delete(async (req, res) => {
                const userId = req.params.id;

                await this.data.delete(userId);

                res.status(200).json({message: `User with id ${userId} was deleted`});
            })
            .post(updateUserValidation, async (req, res) => {
                const userId = req.params.id;
                const userPayload = req.body;

                await this.data.update({id: userId, ...userPayload});

                res.status(200).json({message: `User was changed`});
            });
    }
}

export const userController = new UserController(userData);
