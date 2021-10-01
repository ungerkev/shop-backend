import {Service} from 'typedi';
import {Product} from "../db_models/Product";

@Service()
export class ProductService {
    constructor() { }

    public async getProductsById(id: number): Promise<any> {
        if (!id) {
            throw new Error('Missing Data');
        }

        try {
            return await Product.findAndCountAll({where: {id}});
        } catch (error: any) {
            throw new Error('Could not get products');
        }



    }

}
