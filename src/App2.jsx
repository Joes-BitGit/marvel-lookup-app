import axios from "axios";
import React, { useEffect, useState } from "react";
import { publicAPI } from "./API.js";

const App2 = () => {
  const [data, setData] = useState({});
  const [query, setQuery] = useState("Hulk");
  const [url, setUrl] = useState(
    `https://gateway.marvel.com/v1/public/characters?name=Hulk&apikey=${publicAPI}`
  );

  useEffect(() => {
    const fetchData = async () => {
      // you can await here
      const response = await axios(url);
      // console.log(response.data.data.results[0]);
      setData(response.data.data.results);
    };
    fetchData();
  }, [url]);

  return (
    <div>
      <div>QUERY: {query}</div>
      {data[0].description}
    </div>
  );
};

export default App2;
