import React, { useState } from 'react';

import UseFetch from './UseFetch';
import './App.css';

function DataLoader(props) {
  const data = UseFetch(props.url);

  return (
    <div>
      <ul>
        {data.map((el) => (
          <li key={el.id}>{el.name}</li>
        ))}
      </ul>
    </div>
  );
}

function App() {
  const [buttonText, setButtonText] = useState('Click me, please');
  const [url, setUrl] = useState('https://api.coinmarketcap.com/v1/ticker/?limit=10');

  function handleClick() {
    setButtonText('Thanks, been clicked!');
    setUrl('https://api.coinmarketcap.com/v1/ticker/?limit=20');
  }
  
  return (
    <div>
      <button onClick={handleClick}>{buttonText}</button>
      <DataLoader url={url}/>
    </div>
  );
}

export default App;
