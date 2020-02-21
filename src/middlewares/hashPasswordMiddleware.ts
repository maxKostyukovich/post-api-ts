import bcrypt from 'bcryptjs'
import {SALT} from "../constants";

module.exports = async (req, res, next) => {
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