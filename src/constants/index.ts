export const PORT: number = 5000;
export const SALT: number = 10;
export const JWT: any = {
    secretKey: 'a9032fgdn23023cvb2',
    access: {
        type: 'access',
        expiresIn: '120m',
    },
    email: {
        type: 'email',
        expiresIn: '10m'
    }
};
export const MULTER_TIME_FORMAT = 'x';
export const POST_IMAGES_PATH = '/static/postImages/';