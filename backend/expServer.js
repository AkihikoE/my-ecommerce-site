const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser'); 


const app = express();
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json())

app.use('/api/subject', require('./routes/subject'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/register', require('./routes/register'));
app.use('/api/login', require("./routes/login"));
app.listen(PORT, ()=>{
    console.log("Server is running on http://localhost:"+PORT);
})