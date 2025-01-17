import React, { Component } from 'react';
import './App.css';
import Todos from "./Components/Todo";
import Header from "./Components/Layout/Header";
import AddTodo from "./Components/AddTodo"
//import {v4 as uuid} from 'uuid';
import {BrowserRouter as Router, Route} from "react-router-dom";
import About from "./Components/page/About";
import axios from "axios";

class App extends Component {
  state = {
    todos: []
  }

  componentDidMount() {
    axios.get("http://jsonplaceholder.typicode.com/todos?_limit=10")
      .then(res => this.setState({todos: res.data}))
  }
//Toggle Complete
  markComplete = (id) => {
    this.setState({todos: this.state.todos.map(todo => {
        if(todo.id === id) {
          todo.completed = !todo.completed
        }

      return todo;
    }) });
  }


//Delete Todo
delTodo = (id) => {
axios.delete(`http://jsonplaceholder.typicode.com/todos/${id}`)
.then(res => this.setState({ todos: [...this.state.todos.filter(todo => todo.id !== id)] }));
}

//Add Todo

addTodo = (title) => {
  axios.post("http://jsonplaceholder.typicode.com/todos", {
    title: title,
    completed: false
  })
  .then(res => this.setState({ todos: [...this.state.todos, res.data] }))  
}

  render() { 
  return (
    <Router>
      <div className="App">
        <div className="container">
          <Header />
            <Route exact path="/" render={props => (
              <React.Fragment>
                <AddTodo addTodo={this.addTodo} />
                <Todos todos={this.state.todos} markComplete={this.markComplete}
                delTodo={this.delTodo} />
              </React.Fragment>
             )}/>
            <Route path="/about" component={About}/>
        </div>
      </div>
    </Router>
    );
  }
}

export default App;
