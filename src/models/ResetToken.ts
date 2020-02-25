import {
    Model,
    Column,
    Table,
    Scopes,
    CreatedAt,
    UpdatedAt,
    PrimaryKey,
    AutoIncrement,
    BelongsTo, ForeignKey
} from "sequelize-typescript";
import {User} from './User'
import {HasOneSetAssociationMixin} from "sequelize";

@Table
export class ResetToken extends Model<ResetToken> {
    public setUser!: HasOneSetAssociationMixin<User, number>;

    @PrimaryKey
    @AutoIncrement
    @Column
    id!: number;

    @Column
    emailToken!: string;

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