import { Service } from 'typedi';
import {
    NextFunction,
    Request,
    Response,
} from 'express';
import { ProductService } from "../service/product.service";
import {IProduct} from "../interfaces/IProduct";

/**
 * Product controller class
 */
@Service()
export class ProductController {
    constructor(private productService: ProductService) {}

    /**
     * Controller for getting all products
     * @param req
     * @param res
     * @param next
     */
    getProductsController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const page: string = req.query.page?.toString() || '1';
        const limit: string = req.query.limit?.toString() || '50';

        try {
            const products: { count: number, rows: IProduct[]} = await this.productService.getProducts(parseInt(page, 10), parseInt(limit, 10));
            res.status(200).json({
                count: products.count,
                rows: products.rows
            });
        } catch (err: any) {
            console.log(err);
            next(err);
        }
    }
}
