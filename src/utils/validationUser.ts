import * as yup from 'yup';
class ValidationUser {
    static create = yup.object().shape({
        email: yup.string()
            .email('Invalid Email Format')
            .required('First name is required'),
        password: yup.string()
            .min(6, 'Password must be more then 5 symbols')
            .required('Post id is required'),
        isPaid: yup.boolean()
    });

    static login = yup.object().shape({
        email: yup.string()
            .required('First name is required'),
        password: yup.string()
            .required('Post id is required'),
    });
}
export default ValidationUser
