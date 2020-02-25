import path from 'path'
import {Request} from "express";
import {MULTER_TIME_FORMAT} from "../constants";
import moment from 'moment'

export const createDiskStorageConfig =  (multer: any, dirname: string, pathTo: string) => {
    return multer.diskStorage({
        destination: function (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) {
            cb(null, path.join(dirname, pathTo))
        },
        filename: function (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) {
            cb(null, `${moment().format(MULTER_TIME_FORMAT)}-${file.originalname}`);
        }
    });
};