import React, { useState } from 'react';
import './App.css';

function TodoForm({ addTodo }) {
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
          type='text'
          className='input'
          value={value}
          placeholder='Add Todo...'
          onChange={(e) => setValue(e.target.value)}
      />
    </form>
  );
}

const Todo = ({ todo }) => {
  return (
    <div
        style={{textDecoration: todo.isCompleted ? 'line-through' : ''}}
        className='todo'>{todo.text}</div>
  );
}

function App() {
  const [todos, setTodos] = useState([
    {
      text: 'Learn about React',
      isCompleted: false
    },
    {
      text: 'Meet friend for lunch',
      isCompleted: false
    },
    { text: 'Build really neat todo app',
      isCompleted: false
    }
  ]);

  const addTodo = (text) => {
    const newTodos = [...todos, { text }];
    setTodos(newTodos);
  };

  return (
    <div className='app'>
      <div className='todo-list'>
        {todos.map((todo, index) => (
          <Todo key={index} index={index} todo={todo} />
        ))}
        <TodoForm addTodo={addTodo} />
      </div>
    </div>
  );
}

export default App;
