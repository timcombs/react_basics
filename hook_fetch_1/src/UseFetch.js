import { useState, useEffect } from 'react';

function UseFetch(url) {
  const [data, setData] = useState([]);

  async function getData() {
    const proxyURL = 'https://cors-anywhere.herokuapp.com/';
    const res = await fetch(proxyURL + url);
    const data = await res.json();
    setData(data);
  }

  useEffect(() => {
    getData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return data;
}


export default UseFetch;