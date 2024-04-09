// navigate to homepage only if successful or get a descriptive error 

import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from "../../Slices/UsersSlice"

function LoginForm() {

    const dispatch = useDispatch()

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
          formik.resetForm()
        },    
      });

    return (
        <>
        <form onSubmit={formik.handleSubmit}>
          <fieldset>
            <legend>Login</legend>

            <br />
            
            <label htmlFor="email">Email Address</label>
            <br />
            <input
                id="email"
                name="email"
                onChange={formik.handleChange}
                value={formik.values.email}
            />
            <p>{formik.errors.email}</p>

            <br />

            <label htmlFor="password">Password</label>
            <br />
            <input
                id="password"
                name="password"
                type="password"
                onChange={formik.handleChange}
                value={formik.values.password}
            />
            <p>{formik.errors.password}</p>

            <br />

            <button type="submit">Login</button>

          </fieldset>
        </form>
        </>
    )

}

export default LoginForm