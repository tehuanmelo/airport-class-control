import { useState } from "react";

function FilterInput({ data, setFilterData, label }) {
  const [filterText, setFilterText] = useState("");

  return (
    <div className="fixed top-16 left-0 right-0 z-40 p-3 bg-white">
      <label className="flex items-center gap-2 max-w-xl m-auto">
        {label}
        <input
          type="text"
          placeholder="Search by location, date, ps or name..."
          value={filterText}
          onChange={(e) => {
            const text = e.target.value.toLowerCase();
            setFilterText(text);

            const sorted = data.sort((a,b) => {
              const dateDiff = new Date(b.date) - new Date(a.date)
              const locationDiff = a.location.localeCompare(b.location)
              const timeDiff = new Date(a.start) - new Date(b.start)
              if (dateDiff != 0) return dateDiff
              if (locationDiff != 0) return locationDiff
              if (timeDiff != 0) return timeDiff
            })

            let filtered = sorted.filter((item) => {
              const location = item.location.toLowerCase();
              const date = new Date(item.date).toLocaleDateString();
              const coaches = item.coaches.toLowerCase()
              console.log(typeof(coaches))
              if (location.includes(text) || date.includes(text) || coaches.includes(text)) {
                return item;
              }
            });

            if (text.trim() === "") filtered = data;
            setFilterData(filtered);
          }}
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </label>
    </div>
  );
}

export default FilterInput;
