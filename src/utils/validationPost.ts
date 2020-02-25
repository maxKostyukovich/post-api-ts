import * as yup from 'yup';
class ValidationPost {
    static create = yup.object().shape({
        title: yup.string()
            .required('Title is required'),
        description: yup.string()
            .required('Description is required'),
        PostId: yup.number()
            .required('Post id is required'),
        date: yup.string()
            .required("Date is required"),
        mainImg: yup.string()
            .required("Main image is required")
    });

    static update = yup.object().shape({
        title: yup.string(),
        description: yup.string(),
        PostId: yup.number(),
        topic: yup.string(),
        date: yup.string(),
        mainImg: yup.string()
    });
}
export default ValidationPost