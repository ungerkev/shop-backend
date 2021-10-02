import {Service} from 'typedi';
import {Product} from "../db_models/Product";
import {IProduct} from "../interfaces/IProduct";

@Service()
export class ProductService {
    constructor() { }

    public async getProducts(): Promise<{ rows: IProduct[], count: number }> {
        try {
            return await Product.findAndCountAll();
        } catch (error: any) {
            throw new Error('Could not get products');
        }
    }

}
