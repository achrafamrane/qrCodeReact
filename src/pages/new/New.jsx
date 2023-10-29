import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import {
  BASE_API_URL,
  DPT_Employee,
  IVT_Employee,
  CDR_Employee,
} from "../../config/Api.js";
import axios from "axios";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import photos from "../../assets/photo.png";

const New = ({ inputs, title }) => {
  const validationSchema = Yup.object().shape({
    matricule: Yup.string().required("Matricule is required"),
    firstName: Yup.string().required("firstName is required"),
    lastName: Yup.string().required("lastName is required"),
    typeEmployee: Yup.string().required("typeEmployee is required"),
    // Add other validation rules for your fields
  });

  const initialValues = {
    matricule: "",
    firstName: "",
    lastName: "",
    typeEmployee: "",

    // Add other form fields based on your Employee object
  };
  const [file, setFile] = useState("");
  const navigate = useNavigate();
  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    // Implement the code to send the form data to the Spring Boot backend
    // You may use fetch or a library like axios
    console.log("object" + values.typeEmployee);
    const formData = new FormData();
    formData.append("image", file);

    formData.append("firstName", values.firstName);
    formData.append("lastName", values.lastName);
    formData.append("matricule", values.typeEmployee + "/" + values.matricule);
    try {
      const response = await fetch(`${BASE_API_URL}/employees/addEmployee`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        navigate("/users");
      } else {
      }
    } catch (error) {}

    setSubmitting(false);
    resetForm();
  };
  function handleFileChange(e) {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  }
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            {/* <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            /> */}
          </div>
          <div className="right">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              <Form encType="multipart/form-data">
                <div>
                  <label htmlFor="matricule">first name</label>
                  <Field type="text" id="firstName" name="firstName" />
                  <ErrorMessage
                    name="firstName"
                    component="div"
                    className="errormessage"
                  />
                </div>
                <div>
                  <label htmlFor="matricule">last name</label>
                  <Field type="text" id="lastName" name="lastName" />
                  <ErrorMessage
                    name="lastName"
                    component="div"
                    className="errormessage"
                  />
                </div>
                <div>
                  <label htmlFor="matricule">Matricule</label>
                  <Field as="select" id="typeEmployee" name="typeEmployee">
                    <option value=""></option>
                    <option value={DPT_Employee} label={DPT_Employee} />
                    <option value={CDR_Employee} label={CDR_Employee} />
                    <option value={IVT_Employee} label={IVT_Employee} />
                  </Field>

                  <Field type="text" id="matricule" name="matricule" />
                  <ErrorMessage
                    name="matricule"
                    component="div"
                    className="errormessage"
                  />
                </div>
                {/* Add other form fields here */}
                <div>
                  <label htmlFor="image">Image</label>
                  {/*   <Field
                    type="file"
                    id="image"
                    name="image"
                  /> */}
                  <input type="file" name="image" onChange={handleFileChange} />

                  <ErrorMessage
                    name="image"
                    component="div"
                    className="errormessage"
                  />
                </div>
                <div>
                  <button type="submit">Submit</button>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};
export default New;
