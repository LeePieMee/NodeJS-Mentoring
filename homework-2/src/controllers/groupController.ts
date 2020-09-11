import {Controller} from './controller';
import {groupService, GroupService} from '../services/groupService';
import {Group} from '../types';

class GroupController extends Controller {
    static baseUrl = '/group';
    private service: GroupService;

    constructor(service: GroupService) {
        super();
        this.service = service;
        this.nestedRoutes();
        this.getAllGroups();
        this.create();
    }

    private getAllGroups() {
        this.router.get(`${GroupController.baseUrl}/all`, () => {});
    }

    private create() {
        this.router.post(`${GroupController.baseUrl}`, async (req, res) => {
            const groupDto = req.body as Group;
            try {
                const group = await this.service.save(groupDto);

                res.status(200).json(group);
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

                const user = await this.service.get(userId);

                res.status(200).json(user);
            })
            .delete(async (req, res) => {
                const userId = req.params.id;

                await this.service.delete(userId);

                res.status(200).json({message: `Group with id ${userId} was deleted`});
            })
            .post(async (req, res) => {
                const userId = req.params.id;
                const userPayload = req.body;

                await this.service.update({id: userId, ...userPayload});

                res.status(200).json({message: `Group was changed`});
            });
    }
}

export const groupController = new GroupController(groupService);
