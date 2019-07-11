import React, { useState, useEffect } from 'react';

import './App.css';

function DataLoader() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://api.coinmarketcap.com/v1/ticker/?limit=10', {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "text/plain",
        "mode" : "no-cors"
    }})
    .then((response) => response.json())
    .then((data) => setData(data));
  }, []);

  return (
    <div>
      <ul>
        {data.map((el) => (
          <li key={el.id}>{el.title}</li>
        ))}
      </ul>
    </div>
  );
}

function App() {
  const [buttonText, setButtonText] = useState('Click me, please');

  function handleClick() {
    return setButtonText('Thanks, been clicked!');
  }
  
  return (
    <div>
      <button onClick={handleClick}>{buttonText}</button>
      <DataLoader />
    </div>
  );
}

export default App;
