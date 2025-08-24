import React from "react";

function TimeInput({ data, handleOnChange, classId, label, inputId }) {
  return (
    <>
      <label htmlFor="start" className="block text-sm p-2">
        {label}
      </label>
      <input
        type="time"
        id={inputId}
        value={data[inputId]}
        onChange={(e) => handleOnChange(classId, inputId, e.target.value)}
        required
        className="block w-full p-2 border mb-3 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
      />{" "}
    </>
  );
}

export default TimeInput;
