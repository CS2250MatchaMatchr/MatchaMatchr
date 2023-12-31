import 'bootstrap/dist/css/bootstrap.min.css'
import { Link, useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from "../components/Header";
import React, { useEffect, useState } from 'react'
import { Formik, Form, Field, ErrorMessage, } from 'formik'
import * as Yup from 'yup'
import axios from "axios";
import "../styles/teamCreation.css";


export default function TeamCreation() {

    const [hackerID, setID] = useState([]);
    const [passcodeTeam, setpasscodeTeam] = useState('null, a passcode to join the team will be created once you create a new team');
    const navigate = useNavigate()

    useEffect(() => {
        setID(localStorage.getItem(localStorage.key("hackerID")));
    });

    const initialValues = {
        teamName: ""
    };

    const onSubmit = (data => {
        //Creating Passcode For Team
        let passcode = '';
        let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
            'abcdefghijklmnopqrstuvwxyz0123456789@#$';
        for (let i = 1; i <= 8; i++) {
            let char = Math.floor(Math.random()
                * str.length + 1);

            passcode += str.charAt(char)
        }

        const team = {
            teamName: data.teamName,
            owner: hackerID,
            member1: null,
            member2: null,
            member3: null,
            passcode: passcode
        }

        axios.post("http://localhost:5001/teams", team).then((response) => {
            if (response.data === "You can not create an account whilst a member of a team" || response.data === "Error: Team Name Already Exists") {

                alert(response.data);

            } else {

                alert(response.data)
                setpasscodeTeam(passcode)
                const changeStatus = {
                    lookingForTeam: 0,
                    hackerID: hackerID
                }
                axios.put("http://localhost:5001/teams/switchLookingForTeamStatus", changeStatus).then((response) => {
                    console.log(response.data)
                });


            }
        });
    });

    const validationSchema = Yup.object().shape({
        teamName: Yup.string().required("You must enter a team name before submitting!")
    })

    return (
        <>
            <Header></Header>
            <br />
            <div className="urmom">
                <h2 className="createTeamHead">Create Your Team!</h2>
                <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                    <Form className="teamForm">
                        <label>Enter desired team name: </label>
                        <Field className="teamName" name="teamName" />
                        <br></br>
                        <button className="teamButton">Create new team!</button>
                        <br></br>
                    </Form>
                </Formik>
                <div className="password">
                    Passcode used to invite hackers to your team: <b>{passcodeTeam}</b>
                </div>
                <div className="link">
                    <Link to="/Teams" >Back</Link>
                </div>
            </div>
        </>
    )
}