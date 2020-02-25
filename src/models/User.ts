import {
    Model,
    Column,
    Table,
    Scopes,
    CreatedAt,
    UpdatedAt,
    ForeignKey,
    BelongsTo,
    HasMany,
    Unique,
    PrimaryKey,
    AutoIncrement, HasOne
} from "sequelize-typescript";
import {Profile} from './Profile'
import {CreditCard} from "./CreditCard";
import {Post} from './Post'
import {Comment} from "./Comment";
import {ResetToken} from "./ResetToken";
import {HasOneSetAssociationMixin} from "sequelize";

@Scopes(() => ({

}))
@Table
export class User extends Model<User> {
    public setResetToken!: HasOneSetAssociationMixin<ResetToken, number>;
    @PrimaryKey
    @AutoIncrement
    @Column
    id!: number;

    @Column({
        unique:true
    })
    email!: string;

    @Column
    password!: string;

    @Column({
        defaultValue: false
    })
    isPaid!: boolean;

    @HasOne(() => Profile, {
        foreignKey: 'UserId',
        onDelete: 'CASCADE',
        hooks: true
        }
    )
    profile?:Profile;

    @HasOne(() => ResetToken, {
            foreignKey: 'UserId',
            onDelete: 'CASCADE',
            hooks: true
        }
    )
    resetToken?:ResetToken;

    @HasOne(() => CreditCard, {
        foreignKey: 'UserId',
        onDelete: 'CASCADE',
        hooks: true
    })
    creditCard?: CreditCard;

    @HasMany(() => Post, {
        foreignKey: 'UserId',
        onDelete: 'cascade',
        hooks: true
    })
    posts?: Post[];

    @HasMany(() => Comment, {
        foreignKey: 'UserId',
        onDelete: 'cascade',
        hooks: true
    })
    comments?: Comment[];

    @CreatedAt
    @Column
    createdAt!: Date;

    @UpdatedAt
    @Column
    updatedAt!: Date;
}