import { Service } from 'typedi';
import { Product } from "../db_models/Product";
import { IProduct } from "../interfaces/IProduct";
import fs from "fs";

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
     * Get one product of the given ID
     * @param id number
     */
    public async getProductById(id: number): Promise<IProduct | null> {
        if (!id) {
            throw new Error('Missing data');
        }

        try {
            const product: any = await Product.findOne({ where: { id } });
            return product.dataValues;
        } catch (error: any) {
            throw new Error('Could not get product');
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

    /**
     * Delete product of ID
     * @param id number
     */
    public async deleteProduct(id: number): Promise<number> {
        if (!id) {
            throw new Error('Missing data');
        }

        let product: IProduct | null;

        try {
            product = await this.getProductById(id);
        } catch (e: any) {
            throw new Error(`Product with id ${id} not found`);
        }

        if (!product) {
            throw new Error(`Product with id ${id} not found`);
        }

        fs.unlink(__dirname + '/../../images/' + product?.image, (err) => {
            if (err) {
                throw new Error(`Could not unlink image of product with id ${id}`);
            }
        });

        try {
            return await Product.destroy({where: {id}});
        } catch (e: any) {
            throw new Error(`Could not delete product with id ${id}`);
        }
    }
}
