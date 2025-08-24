import React from "react";

function NumberInput({handleOnChange, state, label}) {
  return (
    <div>
      <label
        className="block text-sm font-bold text-gray-700 p-2"
        htmlFor={`${label}`}
      >
        {label}
      </label>
      <input
        id={`${label}`}
        type="number"
        min="1"
        value={state}
        onChange={(e) => handleOnChange(e.target.value)}
        required
        className="block w-full p-2 border mb-3 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  );
}

export default NumberInput;
