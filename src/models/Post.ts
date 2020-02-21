import {
    AutoIncrement,
    BelongsTo,
    Column,
    CreatedAt,
    ForeignKey,
    Model,
    PrimaryKey,
    Scopes,
    Table,
    UpdatedAt
} from "sequelize-typescript";
import {User} from './User'

@Scopes(() => ({

}))
@Table
export class Post extends Model<Post> {
    @PrimaryKey
    @AutoIncrement
    @Column
    id!: number;

    @Column
    title!: string;

    @Column
    description!: string;

    @Column
    date!: string;

    @Column
    topic!: string;

    @Column
    mainImg!: string;

    @ForeignKey(() => User)
    @Column
    UserId!: number;

    @BelongsTo(() => User)
    user!: User;

    @CreatedAt
    @Column
    createdAt!: Date;

    @UpdatedAt
    @Column
    updatedAt!: Date;
}