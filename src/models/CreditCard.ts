import {
    Model,
    Column,
    Table,
    Scopes,
    CreatedAt,
    UpdatedAt,
    HasOne,
    PrimaryKey,
    AutoIncrement,
    BelongsTo, ForeignKey
} from "sequelize-typescript";
import {User} from './User'
import {HasOneSetAssociationMixin} from "sequelize";

@Scopes(() => ({

}))
@Table
export class CreditCard extends Model<CreditCard> {
    public setUser!: HasOneSetAssociationMixin<User, number>;

    @PrimaryKey
    @AutoIncrement
    @Column
    id!: number;

    @Column
    number!: string;

    @Column
    cvv!: string;

    @Column
    expirationDate!: string;

    @ForeignKey(() => User)
    @Column({
        references:{
            key: 'id',
            model: 'Users'
        },
        onDelete: "CASCADE"
    })
    UserId!: number;

    @BelongsTo(() => User, {
        onDelete: 'CASCADE',
    })
    user!: User;

    @CreatedAt
    @Column
    createdAt!: Date;

    @UpdatedAt
    @Column
    updatedAt!: Date;
}