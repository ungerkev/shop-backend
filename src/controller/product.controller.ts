import { Service } from 'typedi';
import {
    NextFunction,
    Request,
    Response,
} from 'express';
import { ProductService } from "../service/product.service";

/**
 * Product controller class
 */
@Service()
export class ProductController {
    constructor(private productService: ProductService) {}

    getProductsByIdController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const id = parseInt(req.params.id) | 0;
        try {
            const products = await this.productService.getProductsById(id);
            res.status(200).json({products});
        } catch (err: any) {
            console.log(err);
            next(err);
        }
    }
}
