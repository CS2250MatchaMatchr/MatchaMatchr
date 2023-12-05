const express = require('express')
const router = express.Router()
const { Teams, Hackers, sequelize, Technologies, ProfilePic } = require("../models")
const { QueryTypes, where } = require('sequelize');

//Creates a new team with owner
router.post("/", async (req, res) => {
    try{
        const hackerID = req.body.hackerID

        const pfp = {
            hackerID: hackerID,
            imageAddress: "https://media.tenor.com/wy2zHeWyf2gAAAAd/side-eye-dog-suspicious-look.gif"
        }
        await ProfilePic.create(pfp);
        res.send("PFP Created Succesfully");
    } catch (error){
        res.send("Error")
    }
});

router.put("/", async (req, res) => {
    try{
        const hackerID = req.body.hackerID
        const imageAddress = req.body.imageAddress;
        await sequelize.query("UPDATE `ProfilePics` SET imageAddress = '" + imageAddress + "' WHERE hackerID = " + hackerID);
        res.send("Complete");
    } catch (error){
        res.send("Error")
    }
});

//Gets image from hackerID
router.get("/", async (req, res) => {
    try{
        const hackerID = req.query.hackerID
        try{
            let sqlStatement = await sequelize.query("SELECT * FROM `ProfilePics` WHERE hackerID = :hackerID",
            {
                replacements: {hackerID: hackerID},
                type: QueryTypes.SELECT
            });
            res.send(sqlStatement[0].imageAddress);
        }catch (error){
            res.send("Failed"); 
        }
    } catch (error){
        res.send("Error")
    }

});


module.exports = router