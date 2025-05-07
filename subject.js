const http = require('http');

const server = http.createServer(function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    res.writeHead(200, { 'Content-Type': 'text/json' }); 

    res.write('{"contactSubject": ["General Enquiry","Class","Schedule","Intructor","Price","location","Other"]}');
    res.end();
});

server.listen(4040, () => {
    console.log("Server running at http://localhost:4040/");
});
