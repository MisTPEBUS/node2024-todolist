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

  //getAll
  if (req.url == '/todos' && req.method == 'GET') {
    
    res.writeHead(200, headers);
    res.write(JSON.stringify({ "status": 'success', "data": todos.getTodosALL() }));
    res.end();
  }
   //getById
  else if (req.url.startsWith('/todos/') && req.method == 'GET') {
    
    const id = req.url.split('/').pop();
    

    res.writeHead(200, headers);
    res.end(JSON.stringify({ "status": 'success', "data": todos.getTodoById(id) }));
  }
  //insert
  else if (req.url == '/todos' && req.method == "POST") {
    req.on('end', () => {
      try {      
        const todo = JSON.parse(body);
        if(todo.tittle)
        {
          res.write(JSON.stringify({ "status": 'success', "message": `新增${(todos.createTodo(todo)).tittle}成功 `}));
        }
        else{
          res.statusCode = 400;
          res.write(JSON.stringify({ "status": 'error', "message": `新增todo欄位異常 `}));
        }
        res.end();
      } catch (err) {
        // uh oh! bad json!
        res.statusCode = 400;
        return res.end(`error: ${err.message}`);
      }
    });
  }
   //update
   else if (req.url.startsWith('/todos/') && req.method == "PATCH") {
    req.on('end', () => {
      try {      
        const todo = JSON.parse(body);
        const id = req.url.split('/').pop();
        res.writeHead(200, headers);
        res.write(JSON.stringify({ "status": 'success', "message": `更新todo:${todos.updateTodo(id,todo)}成功 `}));
        
       /*  if(todo.tittle )
        {
          res.write(JSON.stringify({ "status": 'success', "message": `更新todo:${todos.updateTodo(id,todo)}成功 `}));
        }
        else{
          res.statusCode = 400;
          res.write(JSON.stringify({ "status": 'error', "message": `更新todo欄位異常 `}));
        } */
        res.end();
      } catch (err) {
        // uh oh! bad json!
        res.statusCode = 400;
        return res.end(`error: ${err.message}`);
      }

     
    });
  }

  else if (req.url == '/todos' && req.method == "OPTIONS") {
    res.writeHead(200, headers);
    res.end(JSON.stringify({ "status": 'OPTIONS' }));
  }
  //delete by id
  else if (req.url.startsWith('/todos/') && req.method == 'DELETE') {
    try {
      const id = req.url.split('/').pop();

    res.writeHead(200, headers);
    res.end(JSON.stringify({ "status": 'success', "data": todos.deleteTodoById(id) }));
    }
    catch (err) {
      req.writeHead(404,headers);
      req.write();
      req.end();
    }
  }
  //delete all
  else if (req.url == '/todos' && req.method == 'DELETE') {
    res.writeHead(200, headers);
    res.write(JSON.stringify({
      "status": "success",
      "data": todos.deleteAll(),
      "message": '資料全數刪除成功!',
    }))
    res.end();
  }
  else {
   
    res.writeHead(404, headers);
    res.write(JSON.stringify({ "status": false, "message": "Path error !" }));
  }
};

const server = http.createServer(reqListener);
server.listen(process.env.PORT || 4000);
