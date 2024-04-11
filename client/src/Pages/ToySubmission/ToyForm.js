import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from 'react-redux'
import { createToy } from "../../Slices/ToySlice"

function ToyForm() {

    const dispatch = useDispatch()
    const status = useSelector(state => state.toys.status)

    const formSchema = yup.object().shape({
        name: yup.string().required("Toy title required").max(50),
        image_url: yup.string().url("Invalid image url").required("Image url required"),
        brand: yup.string().required("Company name required").max(50),
        description: yup.string().required("Description required").max(350),
        link: yup.string().url("Invalid purchase url").required("Purchase link required"),
        age_ranges: yup.array().min(1, "At least one age range must be selected")
      });

    const ageRangeOptions = [
    { value: "0-3 months" },
    { value: "3-6 months" },
    { value: "6-9 months" },
    { value: "9-12 months" },
    { value: "12-18 months" },
    { value: "18-24 months" },
    { value: "2-3 years" },
    { value: "4-5 years" },
    { value: "6-8 years" },
    { value: "9-12 years" }
    ];

    const handleCheckboxChange = (value) => {
        const index = formik.values.age_ranges.indexOf(value);
        if (index === -1) {
            formik.setFieldValue('age_ranges', [...formik.values.age_ranges, value]);
        } else {
            const updatedArray = [...formik.values.age_ranges];
            updatedArray.splice(index, 1);
            formik.setFieldValue('age_ranges', updatedArray);
        }
    };

    const formik = useFormik({
        initialValues: {
            name: "",
            image_url: "",
            brand: "",
            description: "",
            link: "",
            age_ranges: []
        },
        validationSchema: formSchema,
        onSubmit: async (values) => {
            await dispatch(createToy(values));
            // You can check the status here and display a message to the user
            if (status === 'succeeded') {
                console.log(status)
                formik.resetForm();
                alert('Post Successful!');
            } else if (status === 'failed') {
                console.log(status)
                alert('Failed to create toy. Please try again.');
            }
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

            <label htmlFor="description">Description</label>
            <br />
            <input
                id="description"
                name="description"
                type="textarea"
                onChange={formik.handleChange}
                value={formik.values.description}
            />
            <p>{formik.errors.description}</p>

            <br />

            <label htmlFor="link">Purchase Link</label>
            <br />
            <input
                id="link"
                name="link"
                onChange={formik.handleChange}
                value={formik.values.link}
            />
            <p>{formik.errors.link}</p>

            <div>
            <label htmlFor="age_ranges">Age Range/s</label>
                {ageRangeOptions.map((option) => (
                    <div key={option.value}>
                        <input
                            type="checkbox"
                            id={option.value}
                            name="age_ranges"
                            value={option.value}
                            onChange={() => handleCheckboxChange(option.value)}
                            checked={formik.values.age_ranges.includes(option.value)}
                        />
                        <label htmlFor={option.id}> {option.value}</label><br />
                    </div>
                ))}
                <p>{formik.errors.age_ranges}</p>
            </div>

            <button type="submit">Submit Toy</button>

          </fieldset>
        </form>
        </>
    )
}

export default ToyForm