import {Service} from 'typedi';
import {Product} from "../db_models/Product";
import {IProduct} from "../interfaces/IProduct";

@Service()
export class ProductService {
    constructor() { }

    /**
     * Get all products (optional with pagination)
     * @param page number
     * @param limit number
     */
    public async getProducts(page: number, limit: number): Promise<{ rows: IProduct[], count: number }> {
        try {
            return await Product.findAndCountAll({
                offset: (page - 1) * limit,
                limit: limit
            });
        } catch (error: any) {
            throw new Error('Could not get products');
        }
    }

}
