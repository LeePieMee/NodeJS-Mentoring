import {Controller} from './controller';
import {UserGroupService, userGroupService} from '../services/userGroupService';
import {UserGroup} from '../types';
import {ControllerError} from '../helpers/ErrorHandler';

class GroupController extends Controller {
    static baseUrl = '/userGroup';
    private data: UserGroupService;

    constructor(data: UserGroupService) {
        super();
        this.data = data;
        this.create();
    }

    private create() {
        this.router.post(`${GroupController.baseUrl}`, async (req, res, next) => {
            const userGroupDto = req.body as UserGroup;
            try {
                const userGroup = await this.data.save({...userGroupDto});

                res.status(200).json(userGroup);
            } catch (error) {
                next(new ControllerError('UserGroup', 'getUserGroup', error));
            }
        });
    }
}

export const userGroupController = new GroupController(userGroupService);
