import { Response, Request, NextFunction } from "express";
import {User} from "../models/User";
import UnauthorizedError from "../errorHandlers/UnauthorizedError";
import {NotFoundError} from '../errorHandlers/NotFoundError'
import bcrypt, {compareSync} from "bcryptjs";
import {generateAccessToken, generateTokenForResetPassword} from "../utils/generateToken";
import EmailSender from "../utils/EmailSender";
import {emailAuth} from "../config/emailConfig";
import {ResetToken} from "../models/ResetToken";

class AuthController {
    static login = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const noHashPassword = req.body.password;
            const user = await User.findOne({where: {email: req.body.email}});
            if (!user) {
                return next(new UnauthorizedError('Invalid credentials'))
            }
            const isValid = bcrypt.compareSync(noHashPassword, user.password);
            if (!isValid) {
                return next(new UnauthorizedError('Invalid credentials'))
            }
            const accessToken =  generateAccessToken(user.id);
            res.send({user, accessToken});
        } catch (e) {
            next(e);
        }
    };

    static getResetTokenOnEmail = async (req: Request, res: Response, next: NextFunction) => {
        try{
            const email: string = req.body.email;
            const user = await  User.findOne({where: {
                email
                }
            });
            if(!user){
                return next(new NotFoundError('Email not found'))
            }
            const sender = new EmailSender(emailAuth.user, emailAuth.pass);
            const emailToken = generateTokenForResetPassword(email);
            await sender.sendEmail(email, "Reset Password", emailToken);
            console.log(user.resetToken);
            if(user.resetToken){
                await ResetToken.destroy({ where: {
                    UserId: user.id
                    }})
            }
            const resetToken = await ResetToken.create({emailToken: email});
            await user.setResetToken(resetToken);
            res.send("Token were sent successfully "+ emailToken);
        } catch (e) {
            next(e)
        }
    };

    static resetPassword = async (req: Request, res: Response, next: NextFunction) => {
       try{

        } catch (e) {

        }
    }
}
export default AuthController