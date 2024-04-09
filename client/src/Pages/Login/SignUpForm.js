// navigate to homepage only if successful or get a descriptive error

import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch } from 'react-redux'
import { createUser } from "../../Slices/UsersSlice"
import { useNavigate } from "react-router-dom";

function SignupForm() {

  const dispatch = useDispatch()
  const navigate = useNavigate();

  const formSchema = yup.object().shape({
    firstname: yup.string().required("First name required").max(15),
    lastname: yup.string().required("Last name required").max(15),
    email: yup.string().email("Invalid email").required("Email address required"),
    profile_picture: yup.string().url("Invalid image url"),
    password: yup.string().required("Password required"),
    bio: yup.string().max(250),
    country: yup.string().max(15),
  });

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      profile_picture: "",
      bio: "",
      country: "",
    },
    validationSchema: formSchema,
    onSubmit: async (values) => {
      await dispatch(createUser(values));
      // formik.resetForm();
    }
  });

  return (
    <>
    <form onSubmit={formik.handleSubmit}>
      <fieldset>
      <legend>Don't have an account? Sign Up</legend>
      
        <br />

        <label htmlFor="firstname">First Name</label>
        <br />
        
        <input
            id="firstname"
            name="firstname"
            onChange={formik.handleChange}
            value={formik.values.firstname}
        />
        <p>{formik.errors.firstname}</p>

        <br />

        <label htmlFor="lastname">Last Name</label>
        <br />
        <input
            id="lastname"
            name="lastname"
            onChange={formik.handleChange}
            value={formik.values.lastname}
        />
        <p>{formik.errors.lastname}</p>

        <br />
        
        <label htmlFor="email-signup">Email Address</label>
        <br />
        <input
            id="email-signup"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
        />
        <p>{formik.errors.email}</p>

        <br />

        <label htmlFor="password-signup">Password</label>
        <br />
        <input
            id="password-signup"
            name="password"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
        />
        <p>{formik.errors.password}</p>

        <br />

        <label htmlFor="profile_picture">Profile 
        picture</label>
        <br />
        <input
            id="profile_picture"
            name="profile_picture"
            onChange={formik.handleChange}
            value={formik.values.profile_picture}
        />
        <p>{formik.errors.profile_picture}</p>

        <br />

        <label htmlFor="bio">Bio</label>
        <br />
        <input
            id="bio"
            name="bio"
            onChange={formik.handleChange}
            value={formik.values.bio}
        />
        <p>{formik.errors.bio}</p>

        <br />

        <label htmlFor="country">Country</label>
        <br />
        <input
            id="country"
            name="country"
            onChange={formik.handleChange}
            value={formik.values.country}
        />
        <p>{formik.errors.country}</p>

        <br />

        <button type="submit">Sign Up</button>

      </fieldset>
    </form>
    </>
  );
};

export default SignupForm