const http = require('http');
const TodoModel  = require('./todoModel');
const { headers } = require('./header');
const todos = new TodoModel();

const reqListener = (req, res) => {
  let body ='';
  //get form
  req.on('data', (chunk) => {
    body += chunk;
  });

     res.writeHead(200, headers);
    res.write(JSON.stringify({ "status": false, "message": "Path error !" }));
};

const server = http.createServer(reqListener);
server.listen(process.env.PORT || 3000);
