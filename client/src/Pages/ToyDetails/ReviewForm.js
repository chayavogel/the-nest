import React from 'react';
import { useDispatch } from 'react-redux'
import { createReview } from "../../Slices/ReviewsSlice"
import { useFormik } from "formik";
import * as yup from "yup";

function ReviewForm( {toy_id}) {

    const dispatch = useDispatch()

    const formSchema = yup.object().shape({
        title: yup.string().required("Comment title required").max(50),
        body: yup.string().required("Comment body required")
    });

    const formik = useFormik({
        initialValues: {
            title: "",
            body: "",
            toy_id: toy_id
        },
        validationSchema: formSchema,
        onSubmit: async (values) => {
            await dispatch(createReview(values));
            formik.resetForm();
        },    
      });

    return (
        <>
            <form onSubmit={formik.handleSubmit}>

                <fieldset>

                <div className="mb-3">
                    <label 
                    htmlFor="title" 
                    className="form-label">
                    Title
                    </label>
                    <input 
                    type="text" 
                    className={`form-control ${formik.touched.title && formik.errors.title ? 'is-invalid' : ''}`}
                    id="title"
                    name="title"
                    onChange={formik.handleChange}
                    value={formik.values.title}
                    />
                    {formik.touched.title && formik.errors.title && <div className="invalid-feedback">{formik.errors.title}</div>}
                </div>

                <div className="mb-3">
                    <label 
                    htmlFor="body" 
                    className="form-label">
                    Content
                    </label>
                    <textarea 
                    type="text" 
                    className={`form-control ${formik.touched.body && formik.errors.body ? 'is-invalid' : ''}`}
                    id="body"
                    name="body"
                    rows="5"
                    onChange={formik.handleChange}
                    value={formik.values.body}
                    />
                    {formik.touched.body && formik.errors.body && <div className="invalid-feedback">{formik.errors.body}</div>}
                </div>
                    
                <button type="submit" className="btn btn-primary">Post</button>

                </fieldset>

            </form>
        </>
    )
}

export default ReviewForm