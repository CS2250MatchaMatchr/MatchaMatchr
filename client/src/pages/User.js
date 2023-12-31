import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Button } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom'
import "../styles/user.css";

  export function User() {
     //State to allow the localStorage of DB ID
    const [hackerID, setID] = useState([-1]);
    let navigate = useNavigate()

    //useEffect Used to store data into localStorage
    useEffect(() => {
        setID(localStorage.getItem('hackerID'));
    });

      const initialValues = {
      fullName: '',
      classStanding: '',
      gender: '',
      school: '',
      lookingForTeam: true,
      frontOrBackEnd: "",
      github: '',
      linkedIn: '',
      biography: ''
    };

    const onSubmit = (data => {
      data["lookingForTeam"] = true
      data["id"] = hackerID
      console.log(data);
      axios.put("http://localhost:5001/hackers",data).then((response) => {
        if (response.data == "Update Succesful"){
          navigate("/Technologies")
        }
        else{
          alert("An error has occured, please try again with a different email")
          navigate("/")
        }
      })
    });

  const validationSchema = Yup.object().shape({
    fullName: Yup.string().matches(/^[a-zA-Z]+([ '-][a-zA-Z]+)*$/, 'Invalid full name format').required('Full Name is required'),
    classStanding: Yup.string().required('Class Standing is required'),
    gender: Yup.string().required('Gender is required'),
    school: Yup.string().required('School is required'),
    lookingForTeam: Yup.boolean().required('Looking for Team is required'),
    frontOrBackEnd: Yup.string().required('Frontend/Backend selection is required'),
    github: Yup.string().required('Github link is required'),
    linkedIn: Yup.string().required('linkedIn is required'),
    biography: Yup.string()
});
  return (
    <div className="container mt-5">
      <div className="matchaHeader">
        <h1>Edit Profile Info: </h1>
      </div>
      <br />
      <div className="box">
        <h2 className="text-center">Your Profile</h2>
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
          <Form>
            <div className="mb-3">
              <label className="form-label">Enter Full Name:</label>
              <ErrorMessage name="fullName" component="span" />
              <Field className="form-control" name="fullName" placeholder="ex: John Smith" />
            </div>
            <div className="mb-3">
              <label>What Is Your Class Standing?</label>
              <ErrorMessage name="classStanding" component="span" />
              <div role="group" aria-labelledby="class-standing-label">
                <label id="class-standing-label">
                  <Field type="radio" name="classStanding" value="Freshman" />
                  Freshman
                </label>
                <label>
                  <Field type="radio" name="classStanding" value="Sophomore" />
                  Sophomore
                </label>
                <label>
                  <Field type="radio" name="classStanding" value="Junior" />
                  Junior
                </label>
                <label>
                  <Field type="radio" name="classStanding" value="Senior" />
                  Senior
                </label>
              </div>
            </div>
            <div className="mb-3">
              <label>What Is Your Gender?</label>
              <ErrorMessage name="gender" component="span" />
              <div role="group" aria-labelledby="gender-label">
                <label id="gender-label">
                  <Field type="radio" name="gender" value="Male" />
                  Male
                </label>
                <label>
                  <Field type="radio" name="gender" value="Female" />
                  Female
                </label>
                <label>
                  <Field type="radio" name="gender" value="Other" />
                  Other
                </label>
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">What Is Your School?</label>
              <ErrorMessage name="school" component="span" />
              <Field className="form-control" name="school" placeholder="ex: Cal Poly Pomona" />

                <label className="form-label">Frontend or Backend?</label>
                <ErrorMessage name="frontOrBackEnd" component="span" />
                <div role="group" aria-labelledby="front-back-label">
                  <label id="front-back-label">
                    <Field type="radio" name="frontOrBackEnd" value="Frontend" />
                    Frontend
                  </label>
                  <label>
                    <Field type="radio" name="frontOrBackEnd" value="Backend" />
                    Backend
                  </label>
                  <label>
                    <Field type="radio" name="frontOrBackEnd" value="Fullstack" />
                    Fullstack
                  </label>
                </div>
            </div> 
            <label className="form-label">Github Link:</label> 
            <ErrorMessage name="Github" component="span" />
            <Field className="form-control" name="github" placeholder="ex: https://github.com/username" />

            <label className="form-label">LinkedIn Profile: </label>
            <ErrorMessage name="linkedIn" component="span" />
            <Field className="form-control" name="linkedIn" placeholder="ex: https://www.linkedin.com/in/yourprofile" />
            
            <label className="form-label">Tell us about yourself:</label>
            <ErrorMessage name="biography" component="span" />
            <Field className="form-control" name="biography" placeholder="ex: Hi, I wish to be experienced in docker and stuff" />
    
            <button type="submit" className="createButton">Create User Profile!</button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};
export default User;