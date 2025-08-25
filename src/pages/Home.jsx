import { useEffect, useState } from "react";

import { getData } from "../components/services.js";
import Loading from "../components/Loading.jsx";
import DataRow from "../components/DataRow.jsx";
import FilterInput from "../components/FilterInput.jsx";

function Home() {
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const dataFetched = await getData();
      if (dataFetched) {
        const sorted = dataFetched.sort((a, b) => {
          const dateDiff = new Date(b.date) - new Date(a.date);
          if (dateDiff !== 0) return dateDiff;
          const locationDiff = a.location.localeCompare(b.location);
          if (locationDiff !== 0) return locationDiff;
          const startDiff = new Date(a.start) - new Date(b.start);
          if (startDiff !== 0) return startDiff;

          return a.location.localeCompare(b.location);
        });
        setData(sorted);
        setFilterData(sorted);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <main className="max-w-xl mx-auto py-3 pt-32">
      {filterData && (
        <>
          <FilterInput
            data={data}
            setFilterData={setFilterData}
            label="Filter:"
          />
          {filterData.map((data) => (
            <DataRow key={data.id} data={data} />
          ))}
        </>
      )}
    </main>
  );
}

export default Home;
