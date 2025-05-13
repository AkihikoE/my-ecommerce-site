const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const userFilePath = path.join(__dirname, '../data/user.json');

router.post('/', (req, res) => {
  try {
    const { fname, lname, occupation_category, occupation, email, password } = req.body;

    const fileData = fs.readFileSync(userFilePath, 'utf-8');
    const userData = fileData.trim() === '' ? [] : JSON.parse(fileData);

    if (userData.find(user => user.Email === email)) {
      return res.status(400).json({ status: "This email is already in use." });
    }

    const newUser = {
      Firstname: fname,
      Lastname: lname,
      Ocupation_Category: occupation_category,
      Occupation: occupation,
      Email: email,
      Password: password
    };

    userData.push(newUser);
    fs.writeFileSync(userFilePath, JSON.stringify(userData, null, 2));

    res.status(201).json({ status: "Register successfully" });
  } catch (error) {
    console.error("Server Error:", error.message);
    res.status(500).json({ status: "Internal Server Error" });
  }
});

module.exports = router;
