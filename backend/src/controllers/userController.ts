import {IUser, ListQueryParams} from '../types';
import {updateUserValidation, createUserValidation} from '../validators/user';
import {userService, UserService} from '../services/userService';
import {Controller} from './controller';
import {ControllerError} from '../helpers/ErrorHandler';

class UserController extends Controller {
    static baseUrl = '/user';
    private data: UserService;

    constructor(data: UserService) {
        super();
        this.data = data;
        this.create();
        this.getAuthorizedUserList();
        this.nestedRoutes();
    }

    private create() {
        this.router.post(UserController.baseUrl, createUserValidation, async (req, res) => {
            const userData = req.body as IUser;
            try {
                const user = await this.data.createUser(userData);

                res.status(200).json(user);
            } catch (error) {
                res.status(500).json({message: error});
            }
        });
    }

    private getAuthorizedUserList() {
        this.router.get<any, any, any, ListQueryParams>('/getAuthorizedUser', async (req, res, next) => {
            try {
                const {search, limit} = req.query;

                const users = await this.data.searchUsers(search, limit);
                res.status(200).json(users);
            } catch (error) {
                next(new ControllerError('User', 'getAuthorizedUser', error));
            }
        });
    }

    private nestedRoutes() {
        this.router
            .route(`${UserController.baseUrl}/:id`)
            .get(async (req, res, next) => {
                try {
                    const userId = req.params.id;

                    const user = await this.data.get(userId);

                    res.status(200).json(user);
                } catch (error) {
                    next(new ControllerError('User', 'getUser', error));
                }
            })
            .delete(async (req, res, next) => {
                try {
                    const userId = req.params.id;

                    await this.data.delete(userId);

                    res.status(200).json({message: `User with id ${userId} was deleted`});
                } catch (error) {
                    next(new ControllerError('User', 'deleteUser', error));
                }
            })
            .post(updateUserValidation, async (req, res, next) => {
                try {
                    const userId = req.params.id;
                    const userPayload = req.body;

                    await this.data.update({id: userId, ...userPayload});

                    res.status(200).json({message: `User was changed`});
                } catch (error) {
                    next(new ControllerError('User', 'updateUser', error));
                }
            });
    }
}

export const userController = new UserController(userService);
