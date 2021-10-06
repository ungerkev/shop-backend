import {Service} from 'typedi';
import {Product} from "../db_models/Product";
import {IProduct} from "../interfaces/IProduct";

@Service()
export class ProductService {
    constructor() { }

    /**
     * Get all products (optional with pagination)
     * Newest added product is always on top of the list
     * @param page number
     * @param limit number
     */
    public async getProducts(page: number, limit: number): Promise<{ rows: IProduct[], count: number }> {
        try {
            return await Product.findAndCountAll({
                offset: (page - 1) * limit,
                limit: limit,
                order: [
                    ['updatedAt', 'DESC']
                ],
            });
        } catch (error: any) {
            throw new Error('Could not get products');
        }
    }

    /**
     * Save new product in DB
     * @param product IProduct
     */
    public async saveNewProduct(product: IProduct): Promise<IProduct> {
        if (!product || !product.description || !product.price || !product.image || !product.name || !product.tags || !product.articleNr) {
            throw new Error('Missing data');
        }

        try {
            return await Product.create({
                name: product.name,
                image: product.image,
                tags: product.tags,
                price: product.price,
                oldPrice: product.oldPrice,
                description: product.description,
                articleNr: product.articleNr
            })
        } catch (error: any) {
            console.log(error);
            throw new Error('Could not save new product');
        }
    }

}
