import React, { Component } from 'react';
import './custom.scss';
export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: "Adam",
            todoItems: [{ action: "Buy Flowers", done: false, remove: false },
                        { action: "Get Shoes", done: false, remove: false },
                        { action: "Collect Tickets", done: true, remove:false },
                        { action: "Call Joe", done: false, remove:false }],
            newItemText: ""
        }
    }
    updateNewTextValue = (event) => {
        this.setState({ newItemText: event.target.value });
    }
    createNewTodo = () => {
        if ((!this.state.todoItems
                .find(item => item.action === this.state.newItemText )) && this.state.newItemText !=="" ) {
            this.setState({
                todoItems: [...this.state.todoItems,
                    { action: this.state.newItemText, done: false, remove: false }],
                newItemText: ""
            });
        }
    }

    removeFilteredItems = () => {
        const newTodoItems = this.state.todoItems.filter(
                item => item.remove === false 
            );
            this.setState( () => ({
                todoItems: newTodoItems
            }) );    
            console.log(' spakowana tablica: ', newTodoItems);
            console.log(' rozpakowana tablica:',...newTodoItems);
    }

    toggleTodo = (todo) => this.setState({ todoItems:
        this.state.todoItems.map(item => item.action === todo.action
        ? { ...item, done: !item.done } : item) });
    toggleRemove = (remove) => this.setState({ todoItems:
        this.state.todoItems.map(item => item.action === remove.action
        ? { ...item, remove: !item.remove} : item)});
        
    todoTableRows = () => this.state.todoItems.map(item =>
        <tr key={ item.action }>
            <td>{ item.action}</td>
            <td>
                <input type="checkbox" checked={ item.done }
                onChange={ () => this.toggleTodo(item) } />
            </td>
            <td>
                <input type="checkbox" checked={ item.remove }
                onChange={ () => this.toggleRemove(item) } />
            </td>
      </tr> );
  render = () =>
      <div className="">
          <div className="Aro-class">
             <h4 className="bg-primary text-white text-center p-2">
              {this.state.userName}'s Its my list things to do!!!
              ({ this.state.todoItems.filter(t => !t.done).length} items to do)
          </h4> 
          </div>
          
          <div className="container-fluid">
              <div className="my-6">
                  <input className="form-control"
                      value={ this.state.newItemText }
                      onChange={ this.updateNewTextValue } />
                      <div class="d-grid gap-2 d-md-flex">
                        <button className="btn btn-primary me-md-2"
                          onClick={ this.createNewTodo }>Add</button>
                        <button className="btn btn-secondary "
                          onClick={ this.removeFilteredItems }>Remove</button>
                      </div>
              </div>
              <table className="table table-striped table-bordered">
                  <thead>
                      <tr><th>Description</th><th>Done</th><th>Remove</th></tr>
                  </thead>
                  <tbody>{ this.todoTableRows() }</tbody>
              </table>
          </div>
      </div>
}