import {
    Column,
    Model,
    Table,
    AllowNull,
} from 'sequelize-typescript';

@Table({
    timestamps: true,
})

export class Product extends Model {
    @AllowNull(false)
    @Column
    name: string;

    @AllowNull(false)
    @Column
    price: string;

    @AllowNull(true)
    @Column
    oldPrice: string;

    @AllowNull(false)
    @Column
    image: string;

    @AllowNull(false)
    @Column
    articleNr: string;

    @AllowNull(false)
    @Column
    description: string;

    @AllowNull(false)
    @Column
    tags: string;

}