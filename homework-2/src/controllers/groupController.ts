import {Controller} from './controller';
import {GroupData, groupData} from '../dataAccess/groupData';
import {Group} from '../types';

class GroupController extends Controller {
    static baseUrl = '/group';
    private data: GroupData;

    constructor(data: GroupData) {
        super();
        this.data = data;
        this.nestedRoutes();
        this.getAllGroups();
        this.create();
    }

    private getAllGroups() {
        this.router.get(`${GroupController.baseUrl}/all`, () => {});
    }

    private create() {
        this.router.post(`${GroupController.baseUrl}`, async (req, res) => {
            const group = req.body as Group;
            try {
                const user = await groupData.save(group);

                res.status(200).json(user);
            } catch (error) {
                res.status(500).json({message: error});
            }
        });
    }

    private nestedRoutes() {
        this.router
            .route(`${GroupController.baseUrl}/:id`)
            .get(async (req, res) => {
                const userId = req.params.id;

                const user = await this.data.get(userId);

                res.status(200).json(user);
            })
            .delete(async (req, res) => {
                const userId = req.params.id;

                await this.data.delete(userId);

                res.status(200).json({message: `Group with id ${userId} was deleted`});
            })
            .post(async (req, res) => {
                const userId = req.params.id;
                const userPayload = req.body;

                await this.data.update({id: userId, ...userPayload});

                res.status(200).json({message: `Group was changed`});
            });
    }
}

export const groupController = new GroupController(groupData);
