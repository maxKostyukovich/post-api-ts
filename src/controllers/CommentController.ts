import {NextFunction, Request, Response} from "express";
import {Comment} from '../models/Comment'
import moment from 'moment'
import {NotFoundError} from "../errorHandlers/NotFoundError";

class CommentController {
    static create = async(req: Request, res: Response, next: NextFunction) => {
        try{
            const userId = Number(req.headers.userId);
            const comment = req.body;
            comment.UserId = userId;
            comment.date = moment().utc().format();
            const newComment = await Comment.create(comment);
            res.send(newComment);
        } catch (e) {
            next(e);
        }
    };

    static delete = async(req: Request, res: Response, next: NextFunction) => {
        try{
            const modified = await Comment.destroy({where:{id:req.params.id}, cascade: true});
            if(modified < 1){
                return next(new NotFoundError('Comment not found'))
            }
            res.send({modified});
        } catch (e) {
            next(e)
        }
    };

    static get = async(req: Request, res: Response, next: NextFunction) => {
        try{
            const comment = await Comment.findByPk(req.params.id);
            res.send(comment)
        } catch (e) {
            next(e)
        }
    };
}

export default CommentController