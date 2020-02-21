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
    AutoIncrement
} from "sequelize-typescript";
import {Profile} from './Profile'
import {CreditCard} from "./CreditCard";
import {Post} from './Post'
import {Comment} from "./Comment";

@Scopes(() => ({

}))
@Table
export class User extends Model<User> {
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

    @Column
    isPaid!: boolean;

    @ForeignKey(() => Profile)
    @Column
    ProfileId!: number;

    @BelongsTo(() => Profile)
    profile?:Profile;

    @ForeignKey(() => CreditCard)
    @Column
    CreditCardId?: number;

    @BelongsTo(() => CreditCard)
    creditCard?: CreditCard;

    @HasMany(() => Post, 'UserId')
    posts?: Post[];

    @HasMany(() => Comment, 'CommentId')
    comments?: Comment[];

    @CreatedAt
    @Column
    createdAt!: Date;

    @UpdatedAt
    @Column
    updatedAt!: Date;

}