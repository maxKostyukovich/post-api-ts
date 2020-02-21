export const PORT: number = 5000;
export const SALT: number = 10;
export const JWT: object = {
    secretKey: 'a9032fgdn23023cvb2',
    access: {
        type: 'access',
        expiresIn: '60m',
    }
};
export const MULTER_TIME_FORMAT = 'x';