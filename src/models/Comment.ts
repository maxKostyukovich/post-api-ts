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
import {Post} from './Post'

@Scopes(() => ({

}))
@Table
export class Comment extends Model<Comment> {
    @PrimaryKey
    @AutoIncrement
    @Column
    id!: number;

    @Column
    text!: string;

    @Column
    date!: string;

    @ForeignKey(() => User)
    @Column
    UserId!: number;

    @BelongsTo(() => User)
    user!: User;

    @ForeignKey(() => Post)
    @Column
    PostId!: number;

    @BelongsTo(() => Post)
    post!: Post;

    @CreatedAt
    @Column
    createdAt!: Date;

    @UpdatedAt
    @Column
    updatedAt!: Date;
}