import React from "react";
import shortid from 'shortid'


export default class TodoForm extends React.Component {
  state={
    text:''
  }
  handleChange=(event)=>{
    this.setState({
      [event.target.name]:event.target.value
    });
  };
  handleSubmit=(event)=>{
    event.preventDefault();
    this.props.onSubmit({
        id:shortid.generate(),
        text:this.state.text,
        complete:false

    });   //this onSubmit function is this.addTodo from  <TodoForm onSubmit={this.addTodo} />
    this.setState(
      {text:""}
    )
  }
  render(){
    return(
     <form onSubmit={this.handleSubmit} class="input-group-sm mb-3">
      <input 
      name="text"
      value={this.state.text} 
      onChange={this.handleChange}
      placeholder="todo...."/>
     <button onClick={this.handleSubmit} className="btn btn-primary" style={{ marginTop:8,marginBottom: 10,marginLeft:10 }}>add todo</button>
     
    </form>)
    
  }
}