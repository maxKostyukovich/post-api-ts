import {Model, Column, Table, Scopes, CreatedAt, UpdatedAt, HasOne, PrimaryKey, AutoIncrement} from "sequelize-typescript";
import {User} from './User'

@Scopes(() => ({

}))
@Table
export class CreditCard extends Model<CreditCard> {

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

    @HasOne(() => User, 'CreditCardId')
    user!: User;

    @CreatedAt
    @Column
    createdAt!: Date;

    @UpdatedAt
    @Column
    updatedAt!: Date;
}