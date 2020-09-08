import {Controller} from './controller';
import {UserGroupData, userGroupData} from '../dataAccess/userGroupData';
import {UserGroup} from '../types';

class GroupController extends Controller {
    static baseUrl = '/userGroup';
    private data: UserGroupData;

    constructor(data: UserGroupData) {
        super();
        this.data = data;
        this.create();
    }

    private create() {
        this.router.post(`${GroupController.baseUrl}`, async (req, res) => {
            const userGroupDto = req.body as UserGroup;
            try {
                const userGroup = await this.data.save({...userGroupDto});

                res.status(200).json(userGroup);
            } catch (err) {
                res.status(400).json({errorMessage: err});
            }
        });
    }
}

export const userGroupController = new GroupController(userGroupData);
