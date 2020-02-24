import bcrypt from 'bcryptjs'
import {Response, Request, NextFunction} from 'express'
import {SALT} from "../constants";

export const hashPassMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    if(req.body.password) {
        const password: string = req.body.password;
        bcrypt.hash(req.body.password, SALT, (err, hash) => {
            if(!err){
                req.body.password = hash;
                next();
            } else {
                next(new Error ('Password is not hashed'));
            }
        })
    }
};