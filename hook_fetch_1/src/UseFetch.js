import { useState, useEffect } from 'react';

function UseFetch(url) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const proxyURL = 'https://cors-anywhere.herokuapp.com/';
  
    fetch(proxyURL + url, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'text/plain',
        'mode' : 'no-cors'
      }})
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((err) => console.log(err, 'browser hates you!'));
  }, [url]);

  return data;
}


export default UseFetch;