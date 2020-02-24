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

    @Column({
        defaultValue: false
    })
    isPaid!: boolean;

    @ForeignKey(() => Profile)
    @Column({
        references:{
            key: 'id',
            model: 'Profiles'
        },
        onDelete: "CASCADE"
    })
    ProfileId!: number;

    @BelongsTo(() => Profile, {
        foreignKey: 'ProfileId'
        }
    )
    profile?:Profile;


    @ForeignKey(() => CreditCard)
    @Column({
        references:{
            key: 'id',
            model: 'CreditCards'
        },
        onDelete: "CASCADE"

    })
    CreditCardId?: number;

    @BelongsTo(() => CreditCard, {
        foreignKey: 'CreditCardId'
    })
    creditCard?: CreditCard;

    @HasMany(() => Post, {
        foreignKey: 'UserId',
        onDelete: 'cascade',
        hooks: true
    })
    posts?: Post[];

    @HasMany(() => Comment, {
        foreignKey: 'CommentId',
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