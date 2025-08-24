import { useEffect, useState } from "react";

import { getData } from "../components/services.js";
import Loading from "../components/Loading.jsx";
import DataRow from "../components/DataRow.jsx";

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
    return <Loading />;
  }

  return (
    <main className="max-w-xl mx-auto py-3">
        {data.map((data) => <DataRow key={data.id} data={data} />)}
    </main>
  );
}

export default Home;
