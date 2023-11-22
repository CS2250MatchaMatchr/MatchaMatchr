const express = require('express')
const router = express.Router()
const { Teams, Hackers, sequelize, Technologies } = require("../models")
const { QueryTypes, where } = require('sequelize');

//Creates a new team with owner
router.post("/", async (req, res) => {

    const technology = {
        hackerID: req.body.hackerID,
        Javascript: req.body.Javascript,
        Python: req.body.Python,
        Go: req.body.Go,
        Java: req.body.Java,
        Kotlin: req.body.Kotlin,
        PHP: req.body.PHP,
        CSharp: req.body.CSharp,
        Swift: req.body.Swift,
        R: req.body.R,
        Ruby: req.body.Ruby,
        CPP: req.body.CPP,
        C: req.body.C,
        Matlab: req.body.Matlab,
        Typescript: req.body.Typescript,
        SQL: req.body.SQL,
        Scala: req.body.Scala,
        HTML: req.body.HTML,
        CSS: req.body.CSS,
        NoSQL: req.body.NoSQL,
        Rust: req.body.Rust,
        Perl: req.body.Perl,
        Other: req.body.Other,

    }


    const sqlStatement = await sequelize.query("SELECT hackerID FROM Technologies WHERE hackerID = " + req.body.hackerID)
    console.log(sqlStatement[0].hackerID);
    try {
        const sql = sqlStatement[0].hackerID;
        await Technologies.create(technology);
        res.send("Successfully Created");

    }
    catch {
        res.send("Technology already exists");
    }

});

module.exports = router