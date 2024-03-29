const { v4: uuidv4 } = require('uuid');
const { formatDate } = require('./help');
const { errorHandle, successHandle } = require('./resHandle');

class TodoModel {
  constructor() {
    this.todos = [
      {
        "tittle": '這是預設資料',
        "created_at": formatDate(),
        "updated_at": formatDate(),
        "_id": uuidv4(),
      },
    ];
  }

  getTodosALL(res) {
    successHandle(res,200,'',this.todos);    
  }

  getTodoById(res, id) {
    const index = this.todos.findIndex(x => x._id === id);
   
    (index != -1) ? successHandle(res,200,'',this.todos[index]) : errorHandle(res,400, '查無此ID。');
  }

  createTodo(res, todo) {
    const newTodo = {
      "_id": uuidv4(),
      "tittle": todo.tittle,
      "created_at": formatDate(),
      "updated_at": formatDate()
    }
    this.todos.push(newTodo);
    successHandle(res,200, `tittle ${todo.tittle} 建立成功。`);
  }

  updateTodo(res, id, todo) {
    const index = this.todos.findIndex(x => x._id == id);

    if (index != -1) {
      this.todos[index].tittle = todo.tittle;
      this.todos[index].updated_at = formatDate();
      successHandle(res,200, `tittle ${todo.tittle} 更新成功。`);
    }
    else {
      createTodo(res,todo);
    }
  }

  deleteTodoById(res, id) {
    const index = this.todos.findIndex(x => x._id === id);
    
    if (index > -1) {
      this.todos.splice(index, 1);
    }

    if (index != -1) {
      successHandle(res,200, `id: ${id} 已刪除。`);
    }
    else {
      errorHandle(res,400, '查無此ID。');
    }

  }

  deleteAll(res) {
    this.todos.length = 0;
    successHandle(res,200, `全部已刪除。`);
  }
}



module.exports = TodoModel;
