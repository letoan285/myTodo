const Todo = require('./todo.model');


const todoController = {
  //get to do to display in home page
  getTodo (req, res){
    Todo.find({}).sort({createAt: -1}).exec(function(err, todo) {
      if (err) {
        return res.json({success: false, todo: todo, message: 'can not get todo'});
      } else {
        return res.json({success: true, todo: todo, message: 'Get todo successfully'});
      }
    })
  },

  //Add new todo
  addTodo (req, res) {
    var todo = new Todo({
      name: req.body.name,
      createAt: Date.now(),
    });
    todo.save((err) => {
      if (err) {
        return res.json({success: false, message: 'Cannt add todo'});
      } else {
        return res.json({success: true, message: 'Todo added success'});
      }
    })
  },
  //delete todos

  deleteTodo(req, res){
    var todoID = req.params.id;
    Todo.findOneAndRemove({_id:todoID}, function(err) {
      if (err) {
        return res.json({success: false, message: 'Cannt delete todo'});
      } else {
        return res.json({success: true, message: 'Todo deleted successfully'});
      }
    })
  },
  //update todo

  updateTodo(req, res){
    var todoID = req.params.id;
    Todo.findOne({_id:todoID}, function(error, todo){
        todo.name = req.body.name;
        todo.save(function(err) {
          if (err) {
            return res.json({success: false, messsage: 'Cannot update todo'});
          } else {
            return res.json({success: true, message: 'Update todo successfully'});
          }
        })
    })
  },
  updateTodoDone(req, res) {
    var todoID = req.params.id;
    Todo.findOne({_id:todoID}, function (error, todo) {
      todo.done = req.body.value;
      todo.save(function (err) {
        if (err) {
          return res.json({success: false, message: 'Cannt save todo'});
        } else {
          return res.json({success: true, message: 'Save to do successfully'});
        }
      })
    })
  },
  //Check done todo
  getDone(req, res){
    Todo.find({done: true}, function (err, todo) {
      if (err) {
        return res.json({success: false, todo: todo, message: 'Cannot check done' });
      } else {
        return res.json({success: true, todo: todo, message: 'Check done successfully'});
      }
    })
  },

  //check active todo
  getActive(req, res){
    Todo.find({done: false}, function(err, todo){
      if (err) {
        return res.json({success: false, todo: todo, message: 'Cannt check Active'});
      } else {
        return res.json({success: true, todo: todo, message: 'Check active successfully'});
      }
    })
  }
}


module.exports = todoController;
