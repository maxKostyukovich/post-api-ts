import {ApplicationError} from  './ApplicationError';

export class NotFoundError extends ApplicationError {

    constructor(message?:string) {
        super(message || 'Not found', 404);
    }
}