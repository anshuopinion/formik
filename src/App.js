import React from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as yup from "yup";
import KErrorMessage from "./components/KErrorMessage";

const validationSchema = yup.object({
  name: yup.string().required("Name is Required!"),
  phone: yup
    .number()
    .min(1000000000, "Not Valid Phone Number!")
    .max(9999999999, "Not Valid Phone Number!")
    .required("Phone is Required!"),
  password: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    )
    .required("Password is Required!"),
  gender: yup.string().required("Gender is Required!"),
  date: yup.date().required("Date of Birth is required"),
  income: yup.string().required("Required"),
  about: yup
    .string()
    .min(5, "too small!")
    .max(500, "Too Long String")
    .required("Required"),
  social: yup
    .array()
    .of(
      yup
        .string("String is Required!")
        .min(4, "Too Short")
        .max(20, "Too Long")
        .required("Required")
    )
    .min(1, "Atleast One Social Media is Required!")
    .required("Required"),
  hobbies: yup
    .array()
    .of(
      yup
        .string("String is Required!")
        .min(4, "Too Short")
        .max(20, "Too Long")
        .required("Required")
    )
    .min(1, "Atleast One Hobbies is Required!")
    .required("Required"),
});
const App = () => {
  return (
    <div>
      <Formik
        validationSchema={validationSchema}
        initialValues={{
          name: "",
          phone: "",
          password: "",
          gender: "",
          date: "",
          income: "",
          about: "",
          social: [],
          hobbies: [],
        }}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ values }) => (
          <Form>
            <label>Name:</label>
            <Field name="name" type="text" />
            <KErrorMessage name="name" />
            <br /> <br />
            <label>Phone:</label>
            <Field name="phone" type="number" />
            <KErrorMessage name="phone" />
            <br /> <br />
            <label>Password:</label>
            <Field name="password" type="password" />
            <KErrorMessage name="password" />
            <br /> <br />
            <label>Gender:</label>
            <br /> <br />
            <label>Male:</label>
            <Field name="gender" value="male" type="radio" />
            <label>Female:</label>
            <Field name="gender" value="female" type="radio" />
            <KErrorMessage name="gender" />
            <br /> <br />
            <label>Date:</label>
            <Field name="date" type="date" />
            <KErrorMessage name="date" />
            <br /> <br />
            <label>Income:</label>
            <Field name="income" as="select">
              <option value="0">rs 0</option>
              <option value="1000">rs 1000</option>
              <option value="10000">rs 10000</option>
            </Field>
            <KErrorMessage name="income" />
            <br /> <br />
            <label>About:</label>
            <Field name="about" as="textarea" />
            <KErrorMessage name="about" />
            <br /> <br />
            <label>Social:</label>
            <KErrorMessage name="social" />
            <br /> <br />
            <label>Facebook:</label>
            <Field name="social[0]" type="text" />
            <KErrorMessage name="social.0" />
            <br /> <br />
            <label>Twitter:</label>
            <Field name="social[1]" type="text" />
            <KErrorMessage name="social.1" />
            <br /> <br />
            <FieldArray
              name="hobbies"
              render={(arrayHelpers) => (
                <div>
                  {values.hobbies && values.hobbies.length > 0 ? (
                    values.hobbies.map((hobby, index) => (
                      <div key={index}>
                        <Field name={`hobbies.${index}`} />
                        <KErrorMessage name={`hobbies.${index}`} />
                        <button
                          type="button"
                          onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                        >
                          -
                        </button>
                        <button
                          type="button"
                          onClick={() => arrayHelpers.insert(index, "")} // insert an empty string at a position
                        >
                          +
                        </button>
                      </div>
                    ))
                  ) : (
                    <button type="button" onClick={() => arrayHelpers.push("")}>
                      {/* show this when user has removed all hobbies from the list */}
                      Add a Hobbies
                    </button>
                  )}
                </div>
              )}
            />
            <KErrorMessage name={`hobbies`} />
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default App;
