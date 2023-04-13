const http = require('http');
const path = require('path');
const fs = require('fs');

const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    const filename = path.resolve(__dirname, 'calsubs.ics');
    const fstream = fs.createReadStream(filename);
    fstream.pipe(res);
  }
});

server.listen(8000);
