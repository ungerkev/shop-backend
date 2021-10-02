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

    getProductsController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const products: { count: number, rows: IProduct[]} = await this.productService.getProducts();
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
