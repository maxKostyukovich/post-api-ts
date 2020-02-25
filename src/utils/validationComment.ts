import * as yup from 'yup';
class ValidationComment {
    static create = yup.object().shape({
        text: yup.string()
            .required('First name is required'),
        PostId: yup.number()
            .required('Post id is required'),
        date: yup.string()
    });
}
export default ValidationComment
