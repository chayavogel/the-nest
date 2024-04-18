import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from "../../Slices/UsersSlice";
import { useNavigate } from "react-router-dom";

function LoginForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const error = useSelector(state => state.users.error);

    const formSchema = yup.object().shape({
        email: yup.string().email("Invalid email").required("Email address required"),
        password: yup.string().required("Password required"),
    });

    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: formSchema,
        onSubmit: async (values) => {
            await dispatch(loginUser(values));
            navigate("/");
        },    
    });

    return (
        <form onSubmit={formik.handleSubmit}>

            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                    type="email"
                    className={`form-control ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
                    id="email"
                    name="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email && <div className="invalid-feedback">{formik.errors.email}</div>}
                <div className="form-text">We'll never share your email with anyone else.</div>
            </div>

            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                    type="password"
                    className={`form-control ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`}
                    id="password"
                    name="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                />
                {formik.touched.password && formik.errors.password && <div className="invalid-feedback">{formik.errors.password}</div>}
            </div>

            <button type="submit" className="btn btn-primary">Login</button>

            {error && <p className="mt-3 text-danger">{error === "Unexpected token 'P', \"Proxy erro\"... is not valid JSON" ? "Server Down!" : error}</p>}

        </form>
    );
}

export default LoginForm;
