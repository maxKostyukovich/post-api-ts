import ValidationError from'../errorHandlers/ValidationError';
import {NextFunction, Request, Response} from "express";
import * as yup from 'yup'
export const validation = (validationScheme: yup.ObjectSchema) => {
    return function (req: Request, res: Response, next: NextFunction){
        validationScheme.validate(req.body)
            .then(() => next())
            .catch(err => next(new ValidationError(err.message)))
    }
};