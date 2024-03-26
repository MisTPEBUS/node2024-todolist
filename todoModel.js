const { v4: uuidv4 } = require('uuid');
const { formatDate } = require('./formatUtils');



class TodoModel  {  
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

  getTodosALL() {
    return this.todos;
  }

  getTodoById(id) {
    const index = this.todos.findIndex(x => x._id === id);
    console.log('index', id);
    return (index != -1) ? this.todos[index] : {};
  }

  createTodo(todo) {
    const newTodo = {
        "_id": uuidv4(),
        "tittle": todo.tittle,
        "created_at": formatDate(),
        "updated_at": formatDate()
    }
    this.todos.push(newTodo);
    return newTodo;
  }

  updateTodo(id, todo) {
    const index = this.todos.findIndex(x => x._id == id);

    if (index != -1) {
      this.todos[index].tittle = todo.tittle;
      this.todos[index].updated_at = formatDate()
    }
    else {
      createTodo(todo);
    }


    return todo;
  }


  

  deleteTodoById(id) {
    const index = this.todos.findIndex(x => x._id === id);
    if(index > -1){
      this.todos.splice(index,1);
    }
    
    return (index != -1) ? this.todos : {};

  }

  deleteAll() {
    this.todos.length = 0;
    return this.todos;
  }
}



module.exports = TodoModel ;
