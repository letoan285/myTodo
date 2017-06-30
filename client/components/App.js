import React from 'react';
import Header from './Header';


export default class App extends React.Component{
  constructor(props){
    super(props);
    this.getTodo = this.getTodo.bind(this);
    this.addTodo = this.addTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleChangeEditTodo = this.handleChangeEditTodo.bind(this);
    this.editItem = this.editItem.bind(this);
    this.handleDoneTodo = this.handleDoneTodo.bind(this);
    this.filterDone = this.filterDone.bind(this);
    this.filterActive = this.filterActive.bind(this);
    this.filterAll = this.filterAll.bind(this);
    this.filterSeatch = this.filterSeatch.bind(this);
  }

  componentWillMount(){
    this.getTodo();
  }

  getTodo(){
    $get('http://localhost:8000/todo', (response) => {
      this.props.setTodo(response.todo)
    })
  }

  addTodo(e) {
    e.preventDefault();
    $.ajax({
      type: 'POST',
      contentType: 'application/json;charset=utf-8',
      url: 'http://localhost:8000/add-todo',
      data: JSON.stringify({
        name: document.getElementById('add-todo').value
      }),
      success: (response) => {
        if (response.success) {
          document.getElementById('add-todo').value = '';
          this.getTodo();
        } else {
          alert ('Cannt add todo');
        }
      }
    })
  }

  deleteTodo(id){
    $.ajax({
      type: 'DELETE',
      url: 'http://localhost:8000/delete-todo/'+id,
      success: (response) => {
        if (response.success) {
          this.getTodo();
        } else {
          alert('Deleted unsuccessfully!');
        }
      }
    })
  }

  editItem (index, todo) {
    this.props.editTodo({index, todo});
  }

  handleUpdate(e){
    e.preventDefault();
    console.log(this.props.todoApp.editTodo.todo);
    $.ajax({
      type: 'PUT',
      contentType: 'application/json;charset=utf-8',
      url: 'http://localhost:8000/update-todo/'+ this.props.todoApp.editTodo.todo._id,
      data: JSON.stringify({
        name: this.props.todoApp.editTodo.todo.name,
      }),

      success: (response) => {
        if (response.success) {
          this.getTodo();
        }
      }
    })
  }

  handleChangeEditTodo(e){
    this.props.changeTodoValue(e.target.value);
  }


  handleDoneTodo(event, todo){
    $.ajax({
      type: 'PUT',
      contentType: 'application/json;charset=utf-8',
      url: 'http://localhost:8000/update-todo-done/'+ todo._id,
      data: JSON.stringify({
        value: !todo.done,
      }),
      success: (response) => {
        if(response.success){
          this.getTodo();
        }
      }
    })
  }
  filterDone(){
    this.props.filterDone();
  }

  filterActive(){
    this.props.filterActive();
  }

  filterAll(){
    this.props.filterAll();
  }

  filterSeatch(e){
    e.preventDefault();
    const value = document.getElementById('search-todo').value;
    this.props.filterSeatch(value);
  }


  render (){
    return (
      <div className="App">
        <div className="container">
          <Header />
          <h2>Todo Management System</h2><hr/>
          <form onSubmit={this.addTodo}>
            <div className="form-group">
              <input  type="text" className="form-control" id="add-todo" placeholder="Enter todo" />
            </div>


          </form>

          <div className="form-group">
            <input onChange={this.filterSeatch} id="search-todo" type="text" className="form-control" id="search-todo" placeholder="Search todo..." />
          </div>
          <div className="form-group">
            <button onClick={this.filterAll} className="btn btn-primary">All todos</button>
            <button onClick={this.filterActive} className="btn btn-success">Active todos</button>
            <button onClick={this.filterDone} className="btn btn-info">Completed todos</button>
          </div>
          
        </div>
      </div>
    );
  }
}
