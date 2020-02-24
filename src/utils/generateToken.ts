import jwt from 'jsonwebtoken'
import {JWT} from "../constants";

export const generateAccessToken = (id: number) => {
    const payload = {
        type: JWT.access.type,
        id,
    };
    const options = { expiresIn: JWT.access.expiresIn };
    const token = jwt.sign(payload, JWT.secretKey, options);
    console.log(token);
    return token
};