import React, { useState } from "react";
import ClassDetails from "./ClassDetails";

function DataRow({ data }) {
  const [reveal, setReveal] = useState(false);

  return (
    <>
      <div
        onClick={() => setReveal((prev) => !prev)}
        className="bg-white shadow text-sm text-gray-700 mt-2 p-2 cursor-pointer"
      >
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
                data.status === "Given"
                  ? "text-green-600"
                  : data.status === "Canceled"
                  ? "text-red-600"
                  : "text-gray-400"
              }`}
            >
              {data.status}
            </span>
          </div>
          <div className="flex gap-2">
            <p><span className="font-medium text-gray-900">Time: </span>{new Date(data.start).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}</p>
            <p><span className="font-medium text-gray-900">Students: </span>{data.numStudents}</p>
            <p><span className="font-medium text-gray-900">Coaches: </span>{data.numCoaches}</p>
          </div>
        </div>
      </div>
      {reveal && <ClassDetails data={data}/>}
    </>
  );
}

export default DataRow;
