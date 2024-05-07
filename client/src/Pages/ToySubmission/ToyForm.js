import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch } from 'react-redux';
import { createToy } from "../../Slices/ToySlice";

function ToyForm() {
    const dispatch = useDispatch();

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
            const response = await dispatch(createToy(values));
            if (response.type === 'toys/createToy/fulfilled') {
                alert("Submitted!");
                formik.resetForm()
            } else if (response.error.message && response.error.message === "Unexpected token 'P', \"Proxy erro\"... is not valid JSON") {
                alert("Server Down!")
            } else if (response.error.message) {
                alert(response.error.message)
            }
        }
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <fieldset>
                {/* <legend>Post a Toy</legend> */}

                <div className="row g-3">
                    <div className="col-md-4">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input
                            type="text"
                            className={`form-control ${formik.touched.name && formik.errors.name ? 'is-invalid' : ''}`} 
                            id="name"
                            name="name"
                            onChange={formik.handleChange}
                            value={formik.values.name}
                        />
                        {formik.touched.name && formik.errors.name && <div className="invalid-feedback">{formik.errors.name}</div>}
                    </div>

                    <div className="col-md-4">
                        <label htmlFor="image_url" className="form-label">Image</label>
                        <input
                            type="text"
                            className={`form-control ${formik.touched.image_url && formik.errors.image_url ? 'is-invalid' : ''}`} 
                            id="image_url"
                            name="image_url"
                            placeholder="Enter image url"
                            onChange={formik.handleChange}
                            value={formik.values.image_url}
                        />
                        {formik.touched.image_url && formik.errors.image_url && <div className="invalid-feedback">{formik.errors.image_url}</div>}
                    </div>

                    <div className="col-md-4">
                        <label htmlFor="brand" className="form-label">Brand</label>
                        <input
                            type="text"
                            className={`form-control ${formik.touched.brand && formik.errors.brand ? 'is-invalid' : ''}`} 
                            id="brand"
                            name="brand"
                            onChange={formik.handleChange}
                            value={formik.values.brand}
                        />
                        {formik.touched.brand && formik.errors.brand && <div className="invalid-feedback">{formik.errors.brand}</div>}
                    </div>
                </div>

                <div className="row g-3">
                    <div className="col-md-12">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea
                            className={`form-control ${formik.touched.description && formik.errors.description ? 'is-invalid' : ''}`} 
                            id="description"
                            name="description"
                            rows="3"
                            placeholder="I recommend this toy because..."
                            onChange={formik.handleChange}
                            value={formik.values.description}
                        ></textarea>
                        {formik.touched.description && formik.errors.description && <div className="invalid-feedback">{formik.errors.description}</div>}
                    </div>
                </div>

                <div className="row g-3">
                    <div className="col-md-4">
                        <label htmlFor="link" className="form-label">Purchase Link</label>
                        <input
                            type="text"
                            className={`form-control ${formik.touched.link && formik.errors.link ? 'is-invalid' : ''}`} 
                            id="link"
                            name="link"
                            onChange={formik.handleChange}
                            value={formik.values.link}
                        />
                        {formik.touched.link && formik.errors.link && <div className="invalid-feedback">{formik.errors.link}</div>}
                    </div>
                </div>

                <div className="row g-3">
                    <div className="col-md-12">
                        <label htmlFor="age_ranges" className="form-label">Age Range/s</label>
                        <div className="form-text">Select all appropriate</div>
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
                                <label htmlFor={option.value}> {option.value}</label><br />
                            </div>
                        ))}
                        <div className="form-text text-danger">{formik.errors.age_ranges}</div>
                    </div>
                </div>

                <br/>

                <button type="submit" className="btn btn-primary">Submit</button>
            </fieldset>
        </form>
    )
}

export default ToyForm;
