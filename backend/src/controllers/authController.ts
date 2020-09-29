import {Controller} from './controller';
import {authService, AuthService} from '../services/authService';
import {ControllerError} from '../helpers/ErrorHandler';

class AuthController extends Controller {
    private service: AuthService;
    constructor(service: AuthService) {
        super();
        this.service = service;
        this.login();
    }

    private login() {
        this.router.post('/login', async (req, res, next) => {
            try {
                const {login, password} = req.body as any;

                const isUserExist = await this.service.checkUserExist({login, password});

                if (isUserExist) {
                    const accessToken = this.service.generateAccessToken(login);

                    res.json({accessToken});
                }

                next(new ControllerError('502', 'getAuthorizedUser', {message: 'Error'}));
            } catch (error) {
                next(new ControllerError('501', 'getAuthorizedUser', {status: 400}));
            }
        });
    }
}

export const authController = new AuthController(authService);
