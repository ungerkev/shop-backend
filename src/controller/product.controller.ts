import { Service } from 'typedi';
import {
    NextFunction,
    Request,
    Response,
} from 'express';
import { ProductService } from "../service/product.service";
import {IProduct} from "../interfaces/IProduct";
import * as formidable from 'formidable';
// import * as fs from 'fs';

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

    /**
     * Controller for saving new product in DB
     * @param req
     * @param res
     * @param next
     */
    saveNewProductController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const form: any = new formidable.IncomingForm({
            uploadDir: __dirname + '/../../images',
            keepExtensions: true,
        });

        form.parse(req, async (error: any, fields: any, files: any) => {
            if (error) {
                throw new Error('Error at incoming form');
            }
            const imagePath = files.image.path;
            const splits = imagePath.split('/');
            const image = splits[splits.length - 1];

            const product = JSON.parse(fields.product);
            product.image = image;

            try {
                const newProduct = await this.productService.saveNewProduct(product);
                res.status(200).json({ newProduct });
            } catch (e) {
                next(e);
            }
        });
    }
}
