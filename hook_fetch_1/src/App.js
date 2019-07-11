import React, { useState } from 'react';

import './App.css';

function App() {
  const [buttonText, setButtonText] = useState('Click me, please');

  function handleClick() {
    return setButtonText('Thanks, been clicked!');
  }
  
  return <button onClick={handleClick}>{buttonText}</button>
}

export default App;
