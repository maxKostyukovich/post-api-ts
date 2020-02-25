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
    BelongsTo,
    ForeignKey
} from "sequelize-typescript";
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
    })
    user!: User;

    @CreatedAt
    @Column
    createdAt!: Date;

    @UpdatedAt
    @Column
    updatedAt!: Date;
}