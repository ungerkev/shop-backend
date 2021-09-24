import { Service } from 'typedi';
import {
    Request,
    Response,
} from 'express';

/**
 * Status controller class
 */
@Service()
export class StatusController {
    constructor() {}

    status = (req: Request, res: Response): void => {
        const date = new Date();

        const data = {
            program: 'Shop backend',
            version: '1.0.0',
            contact: 'unger.kevin97@gmail.com',
            datetime: date.toJSON(),
            timestamp: date.valueOf(),
            status: 'OK',
            code: 200,
            message: 'All services up and running',
        };
        res.status(200).json(data);
    }
}
