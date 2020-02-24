import {NextFunction, Request, Response} from "express";
import {CreditCard}  from '../models/CreditCard'
import sequelize from "sequelize";
import {User} from "../models/User";
import {NotFoundError} from "../errorHandlers/NotFoundError";
import UnauthorizedError from "../errorHandlers/UnauthorizedError";

class CreditCardController {
    static create = async(req: Request, res: Response, next: NextFunction) => {
        try{
            const user = await User.findByPk(Number(req.headers.userId));
            if(!user){
                return next(new UnauthorizedError())
            }
            const card = await CreditCard.create(req.body);
            await card.setUser(user);
            await user.update({isPaid: true});
            res.send(card);
        } catch (e) {
            next(e);
        }
    };

    static delete = async(req: Request, res: Response, next: NextFunction) => {
        try{
            const modified = await CreditCard.destroy({where: {id: req.params.id}});
            if(modified < 1){
                return next(new NotFoundError('Profile not found'))
            }
            res.send({modified});
        } catch (e) {
            next(e)
        }
    };
}

export default CreditCardController