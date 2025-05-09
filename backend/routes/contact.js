const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    const { fname, lname, email, subject, message } = req.body;
    console.log('Contact form submitted:', { fname, lname, email, subject, message });

    res.status(200).json({ status: "Message Received!" });
});

module.exports = router;
