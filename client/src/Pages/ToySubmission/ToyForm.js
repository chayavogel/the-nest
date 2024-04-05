import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch } from 'react-redux'
import { createToy } from "../ToyCards/ToySlice"

function ToyForm() {

    const dispatch = useDispatch()

    const formSchema = yup.object().shape({
        name: yup.string().required("Toy title required").max(50),
        image_url: yup.string().url("Invalid image url").required("Image url required"),
        brand: yup.string().required("Company name required").max(50),
        description: yup.string().required("Description required").max(350),
        link: yup.string().url("Invalid purchase url").required("Purchase link required")
      });

    const formik = useFormik({
        initialValues: {
            name: "",
            image_url: "",
            brand: "",
            description: "",
            link: "",
        },
        validationSchema: formSchema,
        onSubmit: async (values) => {
            dispatch(createToy(values));
            formik.resetForm();
        },    
      });

      return (
        <>
        <form onSubmit={formik.handleSubmit}>
          <fieldset>
            <legend>Submit a Toy</legend>

            <br />
            
            <label htmlFor="name">Name</label>
            <br />
            <input
                id="name"
                name="name"
                onChange={formik.handleChange}
                value={formik.values.name}
            />
            <p>{formik.errors.name}</p>

            <br />
            
            <label htmlFor="image_url">Toy Image Link</label>
            <br />
            <input
                id="image_url"
                name="image_url"
                onChange={formik.handleChange}
                value={formik.values.image_url}
            />
            <p>{formik.errors.image_url}</p>

            <br />

            <label htmlFor="brand">Brand Name</label>
            <br />
            <input
                id="brand"
                name="brand"
                onChange={formik.handleChange}
                value={formik.values.brand}
            />
            <p>{formik.errors.brand}</p>

            <br />

            <label htmlFor="brand">Description</label>
            <br />
            <input
                id="description"
                name="description"
                onChange={formik.handleChange}
                value={formik.values.description}
            />
            <p>{formik.errors.description}</p>

            <br />

            <label htmlFor="name">Purchase Link</label>
            <br />
            <input
                id="link"
                name="link"
                onChange={formik.handleChange}
                value={formik.values.link}
            />
            <p>{formik.errors.link}</p>

            <br />

            <button type="submit">Submit Toy</button>

          </fieldset>
        </form>
        </>
    )
}

export default ToyForm