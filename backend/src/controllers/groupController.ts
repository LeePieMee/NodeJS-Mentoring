import {Controller} from './controller';
import {groupService, GroupService} from '../services/groupService';
import {Group} from '../types';
import {ControllerError} from '../helpers/ErrorHandler';

export class GroupController extends Controller {
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
        this.router.post(`${GroupController.baseUrl}`, async (req, res, next) => {
            const groupDto = req.body as Group;
            try {
                const group = await this.service.save(groupDto);

                res.status(200).json(group);
            } catch (error) {
                next(new ControllerError('Group', 'createGroup', error));
            }
        });
    }

    private nestedRoutes() {
        this.router
            .route(`${GroupController.baseUrl}/:id`)
            .get(async (req, res, next) => {
                try {
                    const userId = req.params.id;

                    const user = await this.service.get(userId);

                    res.status(200).json(user);
                } catch (error) {
                    next(new ControllerError('Group', 'getGroup', error));
                }
            })
            .delete(async (req, res, next) => {
                try {
                    const userId = req.params.id;

                    await this.service.delete(userId);

                    res.status(200).json({message: `Group with id ${userId} was deleted`});
                } catch (error) {
                    next(new ControllerError('Group', 'deleteGroup', error));
                }
            })
            .post(async (req, res, next) => {
                try {
                    const userId = req.params.id;
                    const userPayload = req.body;

                    await this.service.update({id: userId, ...userPayload});

                    res.status(200).json({message: `Group was changed`});
                } catch (error) {
                    next(new ControllerError('Group', 'changeGroup', error));
                }
            });
    }
}

export const groupController = new GroupController(groupService);
