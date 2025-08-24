import React from "react";

function DataRow({ data }) {
  return (
    <div className="bg-white shadow text-sm text-gray-700 mt-2 p-2">
      <div className="flex justify-between">
        <span className="font-medium text-gray-900">{`${new Date(
          data.date
        ).toLocaleDateString()}`}</span>
        <span className="text-gray-600 italic">{data.location}</span>
      </div>
      <div className="w-full flex justify-between">
        <div className="">
          <span
            className={`px-2 py-1 rounded-full text-xs ${
              data.status === "given"
                ? "text-green-600"
                : data.status === "canceled"
                ? "text-red-600"
                : "text-gray-400"
            }`}
          >
            {data.status}
          </span>
        </div>
        <div className="flex gap-2">
          <span>{`Time: ${new Date(data.start).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}`}</span>
          <span>{`Students: ${data.numStudents}`}</span>
          <span>{`Coaches: ${data.numCoaches}`}</span>
        </div>
      </div>
    </div>
  );
}

export default DataRow;
