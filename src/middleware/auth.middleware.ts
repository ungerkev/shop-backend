import { Service } from 'typedi';
import {
    NextFunction,
    Request,
    Response,
} from 'express';
import axios from 'axios';

/**
 * Auth Middleware
 */
@Service()
export class AuthMiddleware {
    constructor() {}

    /**
     * Check if the users token is still valid and not expired yet
     * @param req
     * authHeader: header
     * @param res
     * @param next
     */
    isAuthenticated = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const authHeader = req.headers.authorization;
        const token = authHeader?.split(' ')[1] || '';

        try {
            await axios.get('http://localhost:3000/checkToken', {
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            });
            next();
        } catch (err) {
            res.status(err.response.status).send(err.response.data);
        }
    }
}
