import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from "axios";
import { Button, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Header from "../components/Header"
import "../styles/Teams.css";

export default function Teams() {
    const [goToTeamCreation, setGoToTeamCreation] = React.useState(false);
    const [goToHackerSearch, setGoToHackerSearch] = React.useState(false);
    const [goToTeamManagement, setGoToTeamManagement] = React.useState(false);
    const [lftStatus, setLFTStatus] = React.useState(false);
    let hackerID = localStorage.getItem(localStorage.key("hackerID"));
    const navigate = useNavigate()

    useEffect(() => {
        hackerID = localStorage.getItem(localStorage.key("hackerID"));
        axios.get("http://localhost:5001/teams/getLFTStatus?hackerID=" + hackerID)
            .then(res => {
                if (res.data.lookingForTeam === 1) {
                    setLFTStatus(true);
                }
            })
    }, []);

    const onSubmit = (data => {
        if (lftStatus == false){
            alert("Youre already in a team dodo head");
        }
        else{
            const datas = document.getElementById('txtbox').value;
            console.log(datas);
            const url = "http://localhost:5001/teams/findTeamByPasscode?passcode=" + datas;
            axios.get(url)
                .then(res => {
                    console.log(res);
                    const teamId = res.data.teamId;
                    console.log(teamId);
                    if (teamId === "Cannot find team") {
                        alert("Team Does Not Exist");
                    } else {
                        const joinJSON = {
                            hackerID: hackerID,
                            passcode: datas
                        }
                        const newUrl = "http://localhost:5001/teams/usePasscodeToJoinTeam";
                        axios.put(newUrl, joinJSON)
                            .then(res => {
                                const response = res.data;
                                if (response === "Team is full") {
                                    alert("Team is already full!");
                                    <Navigate to="/Teams" />
                                } else {
                                    const changeStatus = {
                                        lookingForTeam: 0,
                                        hackerID: hackerID
                                    }
                                    const url4 = "http://localhost:5001/teams/switchLookingForTeamStatus";
                                    axios.put(url4, changeStatus)
                                        .then(res => {
                                            console.log("switched status to " + res);
                                        })

                                    alert("You have been added to the team!");
                                    window.location.reload(false);
                                }

                            })
                    }
                })
            }
        return <Navigate to="/Teams" />
    })

    const initialValue = {
        passcode: ""
    };




    if (goToTeamCreation && lftStatus === true) {
        return <Navigate to="/CreateTeam" />;
    } else if (goToTeamCreation && lftStatus === false) {
        alert("You are already in a team! Leave your team before creating a new one.");
    }

    if (goToHackerSearch) {
        return <Navigate to="/HackerSearch" />;
    }

    if (goToTeamManagement && lftStatus === true) {
        alert("You are not yet in a team. Join one first before managing one.");
    } else if (goToTeamManagement && lftStatus === false) {
        return <Navigate to="/TeamManagement" />;
    }

    return (
        <>
            <Header />
            <br />
            <div className='teams'>
                {/* Should LEAD TO A DIFF PAGE where you can create a team */}
                    {/* onClick sends user to "/TeamCreation" page */}
                    <button name="btn1" className="createTeam" onClick={() => { setGoToTeamCreation(true); }}>Create Team</button>

                {/* DISPLAYS TEAM INFO / MANAGE TEAM */}
                    {/* <h3>Manage Team</h3> */}
                    <button name="btn2" className='manageButton' onClick={() => { setGoToTeamManagement(true) }}>Manage Team</button>

                {/* FORM THAT CAN SEARCH FOR OTHER TEAMS IN DB */}
                    <button name="btn3" className="searchButton" onClick={() => { setGoToHackerSearch(true); }}>Search for Hackers</button>

            </div>

            {/* JOIN PARTY WITH CODE BOX */}
            
            <br />

            <div className='joinPanel'>
                <h5>Join Team via Code</h5>
                <Formik initialValues={initialValue} onSubmit={onSubmit}>
                    <Form>
                        <Field name='passcode' id='txtbox' placeholder='ex. as72Df9G'></Field><br /><br />
                        <button className='joinButton' >Join</button>
                    </Form>
                </Formik>
            </div>

        </>
    );


}