import React, { useState } from 'react';
import './App.css';

const Todo = ({ todo }) => {
  return (
    <div className='todo'>{todo.text}</div>
  );
}

function App() {
  const [todos, setTodos] = useState([
    { text: 'Learn about React' },
    { text: 'Meet friend for lunch' },
    { text: 'Build really neat todo app' }
  ]);

  return (
    <div className='app'>
      <div className='todo-list'>
        {todos.map((todo, index) => (
          <Todo key={index} index={index} todo={todo} />
        ))}
      </div>
    </div>
  );
}

export default App;
