const http = require('http');
const TodoModel = require('./todoRepo');
const { headers } = require('./header');

const { errorHandle,successHandle } = require('./resHandle');

const todos = new TodoModel();

const reqListener = (req, res) => {
  let body = '';
  //get form
  req.on('data', (chunk) => {
    body += chunk;
  });

  //getAll
  if (req.url == '/todos' && req.method == 'GET') {
    todos.getTodosALL(res);
  }
  //getById
  else if (req.url.startsWith('/todos/') && req.method == 'GET') {

    const id = req.url.split('/').pop();
    
    todos.getTodoById(res,id);
  }
  //insert
  else if (req.url == '/todos' && req.method == "POST") {
    req.on('end', () => {
      try {
        const todo = JSON.parse(body);
        if (todo.tittle) {
            todos.createTodo(res,todo);
        }
        else {
         errorHandle(res,400,"tittle不能為空值");
        }
      } catch (err) {
        errorHandle(res,400, err.message);
      }
    });
  }
  //update
  else if (req.url.startsWith('/todos/') && req.method == "PATCH") {
    req.on('end', () => {
      try {
        const todo = JSON.parse(body);
        const id = req.url.split('/').pop();
       
        if (todo.tittle) {
          todos.updateTodo(res,id, todo);
      }
      else {
        errorHandle(res,400,"tittle不能為空值");
      }
      
      } catch (err) {
        errorHandle(res,400, err.message);
      }
    });
  }

  else if (req.url == '/todos' && req.method == "OPTIONS") {
    successHandle(res,200,"");
  }
  //delete by id
  else if (req.url.startsWith('/todos/') && req.method == 'DELETE') {
    try {
      const id = req.url.split('/').pop();
      todos.deleteTodoById(res,id);
    }
    catch (err) {
      errorHandle(res,400, err.message);
    }
  }
  //delete all
  else if (req.url == '/todos' && req.method == 'DELETE') {
    todos.deleteAll(res);
  }
  else {
    errorHandle(res, 404, '查無此路徑!');
  }
};

const server = http.createServer(reqListener);
server.listen(process.env.PORT || 2330);