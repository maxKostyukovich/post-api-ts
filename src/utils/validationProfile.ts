import * as yup from 'yup';
class ValidationProfile {
    static  create = yup.object().shape({
        firstName: yup.string()
            .required('First name is required'),
        lastName: yup.number()
            .required('Last name is required'),
        age: yup.number()
            .integer('Age must be integer')
            .required("Age is required"),
        country: yup.string()
    });

    static update = yup.object().shape({
        firstName: yup.string(),
        lastName: yup.number(),
        age: yup.number()
            .integer('Age must be integer'),
        country: yup.string()
    });
}
export default ValidationProfile