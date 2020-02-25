import {
    AutoIncrement,
    BelongsTo,
    Column,
    CreatedAt,
    ForeignKey, HasMany,
    Model,
    PrimaryKey,
    Scopes,
    Table,
    UpdatedAt
} from "sequelize-typescript";
import {User} from './User'
import {Comment} from "./Comment";
import {DefaultScope} from "sequelize-typescript/dist/scopes";

@DefaultScope({
    attributes: ['id', 'title', 'description', 'date', 'topic', 'mainImg', 'UserId']
})
@Scopes(() => ({
    topic(topic){
        if(!topic){
            return {};
        }
        return {
            where: {
                topic
            }
        }
    }
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


    @HasMany(() => Comment, {
        foreignKey: 'PostId',
        onDelete: 'CASCADE',
        hooks: true,
    })
    comments?: Comment[];

    @CreatedAt
    @Column
    createdAt!: Date;

    @UpdatedAt
    @Column
    updatedAt!: Date;
}