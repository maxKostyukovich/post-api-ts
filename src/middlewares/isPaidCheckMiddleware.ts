import {User} from '../models/User'
import UnauthorizedError from '../errorHandlers/UnauthorizedError'
import {NextFunction, Request, Response} from "express";
import {NotFoundError} from '../errorHandlers/NotFoundError'
export const isPaidCheck = async (req: Request, res: Response, next: NextFunction) => {
    if(!req.headers.userId){
        return next(new Error('Headers not found'))
    }
    const user = await User.findByPk(+req.headers.userId);
    if (!user){
        return next(new NotFoundError('User not found'));
    }
    if(!user.isPaid){
        return next(new UnauthorizedError('Account has not been paid'));
    }
    next();
};