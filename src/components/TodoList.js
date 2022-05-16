import React from "react";
import TodoForm from "./TodoForm";
import Todo from "./Todo"

/*
  TodoMVC
  1. add todo
  2. display todos
  3. cross off todo
  4. show number of active todos
  5. filter all/active/complete
  6. delete todo
  7. delete all complete
    7.1 only show if atleast one is complete
  8. button to toggle all on/off
*/

export default class TodoList extends React.Component {

  state={
    todos:[],
    todoToShow:'all',
    toggleAllComplete:true
  }
  addTodo=(todo)=>{
    
    this.setState(state=>({
      todos:[todo,...state.todos]
      //copy the text
    }))
  }

toggleComplete=(id)=>{
  this.setState(state=>({
    todos:state.todos.map(todo=>{
      if(todo.id===id){
        return {
          ...todo,  //it means todo.text,todo.id are the same 
          complete:!todo.complete
         }
      } else{
        return todo;
      }
    })
  }))
}
updateTodoToShow=(s)=>{
  this.setState({
    todoToShow:s
  })
}

handleDeleteTodo=id=>{
  this.setState(state=>({
    todos:state.todos.filter(todo=>todo.id !==id)
  }))

}

removeAllTodosThatAreComplete=()=>{
  this.setState(state=>({
    todos:state.todos.filter(todo=>!todo.complete)
  }))// didnt have parameter like id

}

  render(){
    console.log(this.state)
    let todos=[];
    if (this.state.todoToShow==='all'){
      todos=this.state.todos;
    }
    else if (this.state.todoToShow==='active'){
      todos=this.state.todos.filter(todo=>!todo.complete)
    }
    else if (this.state.todoToShow==='complete'){
      todos=this.state.todos.filter(todo=>todo.complete)
    }
    return <div>
      <TodoForm onSubmit={this.addTodo} />
      {todos.map(todo=>(
      <Todo 
        key={todo.id}
        todo={todo}
        toggleComplete={()=>this.toggleComplete(todo.id)}
        onDelete={()=>this.handleDeleteTodo(todo.id)}
        />
      ))} 
      <div>
        todos left:{this.state.todos.filter(todo=>!todo.complete).length}
      </div>
      <div>
      <button  class="btn btn-primary  btn-block" style={{ width: 80,flex: 1, marginBottom: 10,marginRight:10 }} onClick={()=>this.updateTodoToShow("all")}>all</button>
      <button  class="btn btn-secondary  btn-block" style={{width: 80,flex: 1, marginBottom: 10,marginRight:10 }} onClick={()=>this.updateTodoToShow("active")}>active</button>
      <button  class="btn btn-success  btn-block"  style={{width: 80, flex: 1, marginBottom: 10,marginRight:10 }} onClick={()=>this.updateTodoToShow("complete")}>complete</button>

      </div>
      
        {this.state.todos.filter(todo=>todo.complete).length?(
        <div>
        <button onClick={this.removeAllTodosThatAreComplete}>remove all complete todos</button>
        </div>
        ) :null}
        <div>
        <button 
        onClick={()=>
          this.setState(state=>({
            todos:
              state.todos.map(todo=>({
              ...todo,
              complete:state.toggleAllComplete
            })),
            toggleAllComplete:!state.toggleAllComplete
          }))
        }
          >toggle all complete:{this.state.toggleAllComplete}</button>
        </div>
    </div>;
    // todos map todo.text and display
    //{JSON.stringify(this.state.todos)}
    //{"id":"E4BG3lQgT","text":"erer","complete":false},{"id":"j9pJGIyTy","text":"deee","complete":false}]
    // <Todo pass the todo.text value to the components Todo.js
    // toggleComplete={()=>this.toggleComplete(todo.id)}/>: use thie fuction and pass it with map(todo=>) by todo.id

    //
  }
}