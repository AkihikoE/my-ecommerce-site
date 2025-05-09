const express = require('express');
const router = express.Router();

const subject = require('../data/contact_subject.json')

router.get('/', (req,res)=>{
    // res.end('{"contactSubject": ["General Enquiry","Class","Schedule","Intructor","Price","location","Other","AKIIIIII"]}');
    res.json(subject);
});

module.exports = router;