const fs = require('fs');
const http = require('http');
const path = require('path');
const url = require('url');

const server = http.createServer(function (req, res) {
    //const q = url.parse(req.url,true);
    

    let filePath = '.'+req.url;
    if(filePath === "./") {
        filePath = "./index.html";
    }

    const extname = path.extname(filePath);
    let contentType = "text/html";
    if (extname === ".css"){
        contentType = "text/css";
    }else if (extname === ".xml"){
        contentType = "text/xml";
    }else if(extname === ".js"){
        contentType = "application/javascript";
    }

    fs.readFile(filePath, function(err,htmlDoc){
        if(err){
            res.writeHead(200,{'Content-Type': 'text/html'});
            return res.end("404 File not found!")
        }
        res.writeHead(200, {'Content-Type': contentType});
        const q = url.parse(req.url,true).query;
        const text = q.fname + " " + q.lname;
        res.write(htmlDoc);
        console.log(err);
        return res.end();
    });

});
server.listen(8080);