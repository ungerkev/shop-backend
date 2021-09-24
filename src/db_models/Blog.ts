import {
    Column,
    Model,
    Table,
    AllowNull,
} from 'sequelize-typescript';

@Table({
    timestamps: true,
})

export class Blog extends Model {
    @AllowNull(false)
    @Column
    header: string;

    @AllowNull(false)
    @Column
    image: string;

    @AllowNull(false)
    @Column
    text: string;

    @AllowNull(false)
    @Column
    description: string;

    @AllowNull(false)
    @Column
    tags: string;

}
