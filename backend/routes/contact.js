const { error } = require('console');
const express = require('express');
const router = express.Router();

const sqlite3 = require('sqlite3').verbose(); // auto error handling
const path = require('path')
const filepath = path.join(__dirname,'../data/contact.db')
const db = new sqlite3.Database(filepath);

db.run(`CREATE TABLE IF NOT EXISTS contact (
    id INTEGER PRIMARY KEY,
    fname TEXT ,
    lname TEXT ,
    email TEXT ,
    subject TEXT ,
    message TEXT ,
    submittedAt DATE
)`);

router.post('/', (req, res) => {
    const { fname, lname, email, subject, message } = req.body;

    db.run(`INSERT INTO contact (fname, lname, email, subject, message, submittedAt) VALUES(?,?,?,?,?,?)`,[fname, lname, email, subject, message, new Date()])
    console.log('Contact form submitted:', { fname, lname, email, subject, message });
    res.status(200).json({ status: "Message Received!" });
});

router.get('/:action', (req,res)=>{
    const { action } = req.params;
    switch(action){
        case "all" :
            var sql = 'SELECT * FROM contact ORDER BY submittedAt DESC';
            db.all(sql, [],(err,rows)=>{
                if(err){
                    return res.status(500).json({error: 'Failed to fetch contact from database'})
                }
                res.json(rows);
            }) 

            break;
        case "last":
            var sql = 'SELECT * FROM contact ORDER BY submittedAt DESC LIMIT 1'
            db.all(sql, [],(err,rows)=>{
                if(err){
                    return res.status(500).json({error: 'Failed to fetch contact from database'})
                }
                res.json(rows);
            }) 
            
            break; 
        case "deleteLast":
            var sql = 'DELETE FROM contact WHERE id = (SELECT max(id) FROM contact)'
            db.all(sql, [],(err,rows)=>{
                if(err){
                    return res.status(500).json({error: 'Failed to fetch contact from database'})
                }
                res.json({message : "last contact is deleted!"});
            })     
            break;
        default:
            res.status(400).json({error: 'action not fould'})
            break;

    }

})

module.exports = router;
