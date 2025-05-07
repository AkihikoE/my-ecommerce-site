const http = require('http');
const url = require('url');


const server = http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  const q = url.parse(req.url,true).query;
  const text = q.fname + " " + q.lname; 
  res.write(text);
  res.end();
});



server.listen(8080)