import {Sequelize} from 'sequelize-typescript';
import {User} from "../models/User";
import {Comment} from "../models/Comment";
import {CreditCard} from "../models/CreditCard";
import {Post} from "../models/Post";
import {Profile} from "../models/Profile";


const sequelize =  new Sequelize({
    database: 'post-api',
    dialect: 'postgres',
    username: 'postgres',
    password: 'postgres',
    storage: ':memory:',
    models: [__dirname + '/models'],
});

sequelize.addModels([User, Comment, CreditCard, Post, Profile]);

export default sequelize;

