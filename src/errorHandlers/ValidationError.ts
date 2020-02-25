import  {ApplicationError} from'./ApplicationError'

class ValidationError extends ApplicationError {
    constructor(message?: string) {
        super(message || 'Something wrong with validation', 400);
    }
}
export default ValidationError;