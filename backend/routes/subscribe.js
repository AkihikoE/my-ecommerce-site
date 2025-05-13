const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path')

/*
1. read existing file
2. parse data in to array
3. add new data into array
4.save array into file
*/

router.post('/', (req, res) => {
    const { email } = req.body;
    const subscribe = { subscribeAt : new Date(), email}

    const filePath = path.join(__dirname,'../data/subscribe.json');

    console.log('Content from submited : ',{ email })

    let subscribes = [];

    if(fs.existsSync(filePath)){

        const fileData = fs.readFileSync(filePath,'utf-8')
        subscribes = JSON.parse(fileData);
        subscribes.push(subscribe);
        fs.writeFileSync(filePath,JSON.stringify(subscribes,null,2))
    }else{
        subscribes.push(subscribe);
        fs.writeFileSync(filePath,JSON.stringify(subscribes,null,2))
        res.status(200).json({status:"Message Received!"});

    }



    res.status(200).json({status:"Message Received!"});
});

module.exports = router;
