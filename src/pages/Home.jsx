import { useEffect, useState } from "react";

import { getData } from "../components/services.js";

function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const dataFetched = await getData();
      if (dataFetched) {
        setData(dataFetched);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return <main>Loading...</main>;
  }

  return (
    <main>
      <ul>
        {data.map((data) => (
          <li key={data.id}>
            {`${new Date(data.date).toLocaleDateString()} - 
            ${data.status} - 
            ${data.location} - 
            ${new Date(data.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - 
            ${data.numStudents} students - 
            ${data.numCoaches} coaches`}
          </li>
        ))}
      </ul>
    </main>
  );
}

export default Home;
