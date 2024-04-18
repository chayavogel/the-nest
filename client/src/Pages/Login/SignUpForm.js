import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from 'react-redux'
import { createUser } from "../../Slices/UsersSlice"
import { useNavigate } from "react-router-dom";

function SignupForm() {

  const dispatch = useDispatch()
  const navigate = useNavigate();

  const error = useSelector((state) => state.users.error)

  const formSchema = yup.object().shape({
    firstname: yup.string().required("First name required").max(15, "15 characters limit"),
    lastname: yup.string().required("Last name required").max(15, "15 characters limit"),
    email: yup.string().email("Invalid email").required("Email address required"),
    profile_picture: yup.string().url("Invalid image url"),
    password: yup.string().required("Password required"),
    bio: yup.string().max(250),
    country: yup.string().required("Country required").max(15),
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
      navigate("/")
    }
  });

  return (
    <>
    <form onSubmit={formik.handleSubmit}>
      <fieldset>
      <legend>Sign Up</legend>
      
      <div>
        <label 
        htmlFor="firstname" 
        className="form-label">
          First name
          </label>
        <input 
        type="text" 
        className={`form-control ${formik.touched.firstname && formik.errors.firstname ? 'is-invalid' : ''}`} 
        id="firstname"
        name="firstname"
        onChange={formik.handleChange}
        value={formik.values.firstname}
        />
        {formik.touched.firstname && formik.errors.firstname && <div className="invalid-feedback">{formik.errors.firstname}</div>}
      </div>

      <div>
        <label 
        htmlFor="lastname" 
        className="form-label">
          Last name
          </label>
        <input 
        type="text" 
        className={`form-control ${formik.touched.lastname && formik.errors.lastname ? 'is-invalid' : ''}`} 
        id="lastname"
        name="lastname"
        onChange={formik.handleChange}
        value={formik.values.lastname}
        />
        {formik.touched.lastname && formik.errors.lastname && <div className="invalid-feedback">{formik.errors.lastname}</div>}
      </div>

      <div className={`mb-3 ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}>
        <label 
        htmlFor="email" 
        className="form-label">
          Email
          </label>
        <input 
        type="email" 
        className={`form-control ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`} 
        id="email"
        name="email"
        onChange={formik.handleChange}
        value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email && <div className="invalid-feedback">{formik.errors.email}</div>}
      </div>

      <div>
        <label 
        htmlFor="password" 
        className="form-label">
          Password
          </label>
        <input 
        type="password" 
        className={`form-control ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`} 
        id="password"
        name="password"
        onChange={formik.handleChange}
        value={formik.values.password}
        />
        {formik.touched.password && formik.errors.password && <div className="invalid-feedback">{formik.errors.password}</div>}
      </div>

      <div>
        <label 
        htmlFor="profile_picture" 
        className="form-label">
          Profile Picture
          </label>
        <input 
        type="text" 
        className={`form-control ${formik.touched.profile_picture && formik.errors.profile_picture ? 'is-invalid' : ''}`} 
        id="profile_picture"
        name="profile_picture"
        onChange={formik.handleChange}
        value={formik.values.profile_picture}
        placeholder="Enter image url"
        />
        <div className="form-text">Optional, can complete later</div>
        {formik.touched.profile_picture && formik.errors.profile_picture && <div className="invalid-feedback">{formik.errors.profile_picture}</div>}
      </div>

      <div>
        <label 
        htmlFor="bio" 
        className="form-label">
          Bio
          </label>
        <textarea 
        className={`form-control ${formik.touched.bio && formik.errors.bio ? 'is-invalid' : ''}`} 
        id="bio"
        name="bio"
        onChange={formik.handleChange}
        value={formik.values.bio}
        />
        <div className="form-text">Optional, can complete later</div>
        {formik.touched.bio && formik.errors.bio && <div className="invalid-feedback">{formik.errors.bio}</div>}
      </div>

      <div>
        <label 
        htmlFor="country" 
        className="form-label">
          Country
          </label>
        <input 
        type="text" 
        className={`form-control ${formik.touched.country && formik.errors.country ? 'is-invalid' : ''}`} 
        id="country"
        name="country"
        onChange={formik.handleChange}
        value={formik.values.country}
        />
        {formik.touched.country && formik.errors.country && <div className="invalid-feedback">{formik.errors.country}</div>}
      </div>

      <p className={`text-danger`}>{error === "Unexpected token 'P', \"Proxy erro\"... is not valid JSON" ? "Server Down!" : error}</p>

      <button type="submit" className ="btn btn-primary">Sign Up</button>

      </fieldset>
    </form>
    </>
  );
};

export default SignupForm;
