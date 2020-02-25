import {NextFunction, Request, Response} from 'express'
import {generateAccessToken} from "../utils/generateToken";
import UnauthorizedError from '../errorHandlers/UnauthorizedError'
import bcrypt from 'bcryptjs'
import {User} from "../models/User";


class UserController {
    static create = async(req: Request, res: Response, next: NextFunction) => {
        try {
            const newUser = await User.create(req.body);
            const accessToken =  generateAccessToken(newUser.id);
            const user = await User.findByPk(newUser.id, {attributes: {exclude:['password']}});
            res.send({user, accessToken});
        } catch (e) {
            next(e);
        }
    };

    // static login = async (req: Request, res: Response, next: NextFunction) => {
    //     try {
    //         const noHashPassword = req.body.password;
    //         const user = await User.findOne({where: {email: req.body.email}});
    //         if (!user) {
    //             return next(new UnauthorizedError('Invalid credentials'))
    //         }
    //         const isValid = bcrypt.compareSync(noHashPassword, user.password);
    //         if (!isValid) {
    //             return next(new UnauthorizedError('Invalid credentials'))
    //         }
    //         const accessToken =  generateAccessToken(user.id);
    //         res.send({user, accessToken});
    //     } catch (e) {
    //         next(e);
    //     }
    // };

    static delete = async (req: Request, res: Response, next: NextFunction) => {
        try {
            await User.destroy({where: {id: req.params.id}, cascade: true, });
            res.send();
        } catch (e) {
            next(e);
        }
    };
}

export default UserController;



