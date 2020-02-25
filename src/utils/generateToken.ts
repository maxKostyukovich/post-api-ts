import jwt from 'jsonwebtoken'
import {JWT} from "../constants";

export const generateAccessToken = (id: number) => {
    const payload = {
        type: JWT.access.type,
        id,
    };
    const options = { expiresIn: JWT.access.expiresIn };
    const token = jwt.sign(payload, JWT.secretKey, options);
    return token
};

export const generateTokenForResetPassword = (email: string) => {
    const payload = {
        type: JWT.email.type,
        email
    };
    const options = { expiresIn: JWT.email.expiresIn };
    const emailToken = jwt.sign(payload, JWT.secretKey,options);
    return emailToken;
};