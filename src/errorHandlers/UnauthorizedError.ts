import {ApplicationError} from  './ApplicationError';

class UnauthorizedError extends ApplicationError {

    constructor(message?: string) {
        super(message || 'Unauthorized', 401);
    }
}
export default UnauthorizedError