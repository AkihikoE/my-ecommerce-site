const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const userFilePath = path.join(__dirname, '../data/user.json');

router.post('/', (req, res) => {
    const { Email, Password } = req.body;

    try {
        const fileData = fs.readFileSync(userFilePath, 'utf-8');
        const users = fileData.trim() === '' ? [] : JSON.parse(fileData);

        const foundUser = users.find(user => user.Email === Email);

        if (foundUser) {
            if (foundUser.Password === Password) {
                console.log("Login Successfully!");
                res.status(200).json({ status: "Login Successfully!" });
            } else {
                console.log("Incorrect Password!");
                res.status(200).json({ status: "Incorrect Password!" });
            }
        } else {
            console.log("Incorrect Username!");
            res.status(200).json({ status: "Incorrect Username" });
        }
    } catch (error) {
        console.error("Error reading file:", error.message);
        res.status(500).json({ status: "Server Error" });
    }
});

module.exports = router;
