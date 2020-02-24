import jwt from 'jsonwebtoken'
import {NextFunction, Request, Response} from "express";
import UnauthorizedError from '../errorHandlers/UnauthorizedError'
import {JWT} from "../constants";

export const accessTokenVerify = async(req: Request, res: Response, next: NextFunction) => {
    try {
        let authHeader = req.get('Authorization');
        if (!authHeader) {
            return next(new UnauthorizedError());
        }
        const token = authHeader.replace('Bearer ', '');
        const payload = <{id: string}> jwt.verify(token, JWT.secretKey);
        req.headers.userId = String(payload.id);
        next();
    } catch (err) {
        if(err instanceof jwt.TokenExpiredError){
            next(new UnauthorizedError('Token expired'));
        } else
        if (err instanceof jwt.JsonWebTokenError) {
            next(new UnauthorizedError('Invalid token'));
        } else {
            next(err);
        }
    }
};