import {Model, Column, Table, Scopes, CreatedAt, UpdatedAt, HasOne, PrimaryKey, AutoIncrement} from "sequelize-typescript";
import {User} from './User'
@Scopes(() => ({

}))
@Table
export class Profile extends Model<Profile> {
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

    @HasOne(() => User, 'ProfileId')
    user!: User;

    @CreatedAt
    @Column
    createdAt!: Date;

    @UpdatedAt
    @Column
    updatedAt!: Date;
}