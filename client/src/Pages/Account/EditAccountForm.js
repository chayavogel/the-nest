import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch } from 'react-redux'
import { updateUser, clearError } from "../../Slices/UsersSlice";
import { useEffect } from "react";

function EditAccountForm( { user } ) {
 
    const dispatch = useDispatch()

    useEffect(() => {
        return () => {
          dispatch(clearError());
        };
      }, []);

    const formSchema = yup.object().shape({
        firstname: yup.string().required("First name required").max(15),
        lastname: yup.string().required("Last name required").max(15),
        email: yup.string().email("Invalid email").required("Email address required"),
        profile_picture: yup.string().url("Invalid image url"),
        // Currently you cannot edit your password
        // password: yup.string().required("Password required"),
        bio: yup.string().max(250),
        country: yup.string().required("Country required").max(15),
    });

    const formik = useFormik({
        initialValues: {
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          // password: user.password,
          profile_picture: user.profile_picture || '',
          bio: user.bio || '',
          country: user.country,
        },
        validationSchema: formSchema,
        onSubmit: async (values) => {
            const response = await dispatch(updateUser(values));
            if (response.type === 'users/updateUser/fulfilled') {
                alert("Changes Saved!");
              } else if (response.error.message && response.error.message === "Unexpected token 'P', \"Proxy erro\"... is not valid JSON") {
                alert("Server Down!")
              } else if (response.error.message) {
                alert(response.error.message)
              }
        },
      });

    return (
        <>
        <form onSubmit={formik.handleSubmit}>
        <fieldset>
        <legend><h3 className="title">Account</h3></legend>
        
        <div className="mb-3">
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
        placeholder="Jane" 
        onChange={formik.handleChange}
        value={formik.values.firstname}
        />
        {formik.touched.firstname && formik.errors.firstname && <div className="invalid-feedback">{formik.errors.firstname}</div>}
      </div>

      <div className="mb-3">
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
        placeholder="Smith" 
        onChange={formik.handleChange}
        value={formik.values.lastname}
        />
        {formik.touched.lastname && formik.errors.lastname && <div className="invalid-feedback">{formik.errors.lastname}</div>}
      </div>
            
      <div className ="mb-3">
        <label htmlFor="exampleFormControlInput1" className="form-label">Email</label>
        <input 
        type="email" 
        className={`form-control ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`} 
        id="email-signup" 
        placeholder="name@example.com" 
        name="email"
        onChange={formik.handleChange}
        value={formik.values.email}/>
        {formik.touched.email && formik.errors.email && <div className="invalid-feedback">{formik.errors.email}</div>}
      </div>

      <div className="mb-3">
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
        placeholder="Enter image url" 
        onChange={formik.handleChange}
        value={formik.values.profile_picture}
        />
        {formik.touched.profile_picture && formik.errors.profile_picture && <div className="invalid-feedback">{formik.errors.profile_picture}</div>}
        <div id="passwordHelpBlock" className="form-text">
        Optional. Enter image url
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="exampleFormControlTextarea1" className="form-label">Bio</label>
        <textarea 
        id="bio"
        name="bio"
        className={`form-control ${formik.touched.bio && formik.errors.bio ? 'is-invalid' : ''}`} 
        rows="3"
        value={formik.values.bio}
        placeholder="Tell us about yourself!"
        onChange={formik.handleChange}
        ></textarea>
        {formik.touched.bio && formik.errors.bio && <div className="invalid-feedback">{formik.errors.bio}</div>}
        <div id="passwordHelpBlock" className="form-text">
          Optional
        </div>
      </div>

      <div className="mb-3">
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
        placeholder="Jane" 
        onChange={formik.handleChange}
        value={formik.values.country}
        />
        {formik.touched.country && formik.errors.country && <div className="invalid-feedback">{formik.errors.country}</div>}
      </div>

      <button type="submit" className ="btn btn-secondary">Update Account</button>

        </fieldset>
        </form>
        </>
    )
}

export default EditAccountForm