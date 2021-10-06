/**
 * IProduct
 */
export interface IProduct {
    id?: number;
    image: string;
    name: string;
    description: string;
    price: number;
    oldPrice: number;
    tags: string;
    articleNr: string;
}

/**
 * Get IProduct
 * @returns IProduct
 */
export function getIProduct(): IProduct {
    return {
        id: 0,
        image: '',
        name: '',
        description: '',
        price: 0,
        oldPrice: 0,
        tags: '',
        articleNr: ''
    };
}
