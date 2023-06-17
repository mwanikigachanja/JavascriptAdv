import React, { Component } from 'react';
import cx from 'classnames';

export default class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      inputValue: ''
    };
  }

  handleInputChange = (event) => {
    this.setState({ inputValue: event.target.value });
  };

  handleAddTodo = () => {
    const { todos, inputValue } = this.state;
    if (inputValue.trim() !== '') {
      const newTodo = {
        id: Date.now(),
        text: inputValue,
        completed: false
      };
      this.setState({
        todos: [...todos, newTodo],
        inputValue: ''
      });
    }
  };

  toggleTodoStatus = (id) => {
    this.setState((prevState) => ({
      todos: prevState.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    }));
  };

  render() {
    const { todos, inputValue } = this.state;
    const incompleteTasks = todos.filter((todo) => !todo.completed);

    return (
      <>
        <div>
          <h2>Todo List</h2>
        </div>
        <div>
          <input
            type="text"
            value={inputValue}
            onChange={this.handleInputChange}
          />
          <button onClick={this.handleAddTodo}>Add</button>
        </div>
        <ul>
          {todos.map((todo) => (
            <li
              key={todo.id}
              className={cx({ 'is-done': todo.completed })}
              onClick={() => this.toggleTodoStatus(todo.id)}
            >
              {todo.text}
            </li>
          ))}
        </ul>
        <p className="task-counter">
          {incompleteTasks.length} remaining out of {todos.length} tasks
        </p>
        <style>{`
          .is-done {
            text-decoration: line-through;
          }
          .task-counter {
            font-weight: bold;
          }
        `}</style>
      </>
    );
  }
}
