import {Model, Column, Table, Scopes, CreatedAt, UpdatedAt, HasOne, PrimaryKey, AutoIncrement} from "sequelize-typescript";
import {User} from './User'
import {HasOneSetAssociationMixin} from "sequelize";
@Scopes(() => ({

}))
@Table
export class Profile extends Model<Profile> {

    public setUser!: HasOneSetAssociationMixin<User, number>;
    @PrimaryKey
    @AutoIncrement
    @Column
    id!: number;

    @Column
    firstName!: string;

    @Column
    lastName!: string;

    @Column
    age!: number;

    @Column
    country?: string;

    @HasOne(() => User, {
        foreignKey:'ProfileId',
        onDelete: 'CASCADE',
        hooks: true
    })
    user!: User;

    @CreatedAt
    @Column
    createdAt!: Date;

    @UpdatedAt
    @Column
    updatedAt!: Date;
}