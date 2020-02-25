import * as yup from 'yup';
class ValidationCreditCard {
    static create = yup.object().shape({
        number: yup.string()
            .required('Number is required'),
        cvv: yup.number()
            .required('CVV is required'),
        expirationDate: yup.string()
            .required("Expiration date is required")
    });
}
export default ValidationCreditCard