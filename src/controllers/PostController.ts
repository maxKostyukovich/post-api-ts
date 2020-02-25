import {NextFunction, Request, Response} from "express";
import moment from 'moment'
import fs from 'fs'
import {POST_IMAGES_PATH} from '../constants'
import {Post}  from '../models/Post'
import {Comment} from '../models/Comment'
import {NotFoundError} from "../errorHandlers/NotFoundError";

class PostController {
    static create = async(req: Request, res: Response, next: NextFunction) => {
        try{
            const post = req.body;
            post.mainImg = req.file.filename;
            console.log(post.mainImg);
            post.date = moment(post.date, 'YYYY-MM-DD HH:mm').utc().format();
            post.UserId = Number(req.headers.userId);
            const newPost = await Post.create(post);
            res.send(newPost);
        } catch (e) {
            next(e);
        }
    };

    static update = async(req: Request, res: Response, next: NextFunction) => {
        try{
            const post = req.body;
            const oldPost = await Post.findByPk(req.params.id);
            if(!oldPost){
                return next(new NotFoundError('Post not found'))
            }
            post.UserId = Number(req.headers.userId);
            if(req.file){
                fs.unlink("public/static/images/postImages/" + oldPost.mainImg, (err) => {
                    if (err) throw err
                });
                post.mainImg = req.file.filename;
            }
            if(post.date) {
                post.date = moment(post.date).utc().format('YYYY-MM-DD HH:mm');
            }
            await Post.update(post, {where: {id: oldPost.id}});
            res.status(201).send();
        } catch (e) {
            next(e)
        }
    };

    static delete = async(req: Request, res: Response, next: NextFunction) => {
        try{
            const post = await Post.findByPk(req.params.id);
            if(!post){
                return next(new NotFoundError('Post not found'))
            }
            const modified = await Post.destroy({where: {id: req.params.id}, cascade: true});
            fs.unlink("public/static/images/postImages/" + post.mainImg, (err) => {
                if (err) throw err
            });
            res.send({modified});
        } catch (e) {
            next(e)
        }
    };

    static get = async(req: Request, res: Response, next: NextFunction) => {
        try {
            const post = await Post.findOne({where: {id: req.params.id}, include: [{model:Comment}]});
            if(!post){
                return next(new NotFoundError('Post was not found'))
            }
            post.mainImg = POST_IMAGES_PATH + post.mainImg;
            res.send(post);
        } catch (e) {
            next(e);
        }
    };

    static getAll = async(req: Request, res: Response, next: NextFunction) => {
        try{
            const posts = await Post.scope({method: ['topic', req.query.topic]}).findAll();
            posts.forEach((value) => {
                value.mainImg =  POST_IMAGES_PATH + value.mainImg;
            });
            res.send(posts);
        } catch (e) {
            next(e);
        }
    };
}

export default PostController