import {Response, Request, NextFunction} from 'express'
export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    if(err.status){
        res.status(err.status).send(err.message);
    }else {
        res.status(500).send(err.message);
    }
};