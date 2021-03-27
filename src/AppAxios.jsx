import React, { useEffect, useState } from "react";
import axios from "axios";

function App2() {
  // hits === Hacker news articles
  const [data, setData] = useState({ hits: [] });
  const [query, setQuery] = useState("redux");
  const [url, setUrl] = useState(
    "https://hn.algolia.com/api/v1/search?query=redux"
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      // You can await here
      const result = await axios(url);
      setData(result.data);
      setLoading(false);
    };
    fetchData();
  }, [url]);

  return (
    <>
      <input
        type="text"
        value={query}
        onInput={(Event) => setQuery(Event.target.value)}
      />
      <button
        onClick={() =>
          setUrl(`https://hn.algolia.com/api/v1/search?query=${query}`)
        }
      >
        Search
      </button>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {data.hits.map((item) => (
            <li key={item.objectID}>
              <a href={item.url}>{item.title}</a>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default App2;
