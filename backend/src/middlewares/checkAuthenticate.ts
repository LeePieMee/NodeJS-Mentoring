import jwt from 'jsonwebtoken';
import {ControllerError} from '../helpers/ErrorHandler';

export function checkAuthenticate(req: any, _res: any, next: any) {
    const token = req.headers.authorization;

    if (req.originalUrl === '/login') {
        return next();
    }

    if (!token) {
        next(new ControllerError('401', null, {message: 'Invalid token'}));
    }

    jwt.verify(token, 'secret', (err: any) => {
        if (err) {
            next(new ControllerError('403', null, {message: 'Your token is deprecated'}));
        }

        next();
    });
}
