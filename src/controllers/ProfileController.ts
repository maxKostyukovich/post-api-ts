import {NextFunction, Request, Response} from "express";
import {Profile}  from '../models/Profile'
import {User} from "../models/User";
import {NotFoundError} from "../errorHandlers/NotFoundError";

class ProfileController {
    static create = async(req: Request, res: Response, next: NextFunction) => {
        try{
            const user = await User.findByPk(Number(req.headers.userId));
            if(!user){
                return next(new NotFoundError('User not found'));
            }
            const profile = await Profile.create(req.body);
            await profile.setUser(user);
            res.send(profile);
        } catch (e) {
            next(e);
        }
    };

    static update = async(req: Request, res: Response, next: NextFunction) => {
        try{
            const profile = await Profile.findByPk(req.params.id);
            if(!profile){
                return next(new NotFoundError('Profile not found'))
            }
            await profile.update(req.body);
            res.send({...profile, ...req.body})
        } catch (e) {
            next(e)
        }
    };

    static delete = async(req: Request, res: Response, next: NextFunction) => {
        try{
            const modified = await Profile.destroy({where: {id: req.params.id}});
            if(modified < 1){
                return next(new NotFoundError('Profile not found'))
            }
            res.send({modified});
        } catch (e) {
            next(e)
        }
    };

    static get = async(req: Request, res: Response, next: NextFunction) => {
        try {
            const profile = await Profile.findByPk(req.params.id);
            if(!profile){
                return next(new NotFoundError('Profile not found'))
            }
            res.send(profile);
        } catch (e) {
                next(e);
        }
    };

    static getAll = async(req: Request, res: Response, next: NextFunction) => {
        const profiles = await Profile.findAll({attributes: {exclude: ["createdAt", "updatedAt"]}});
        if(!profiles){
            return next(new NotFoundError('User not found'))
        }
        res.send(profiles);
    };
}

export default ProfileController