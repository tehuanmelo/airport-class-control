import React from "react";

function Radio({ handleOnchange, classId, data, label }) {
  return (
    <div className="p-2 flex items-center space-x-1">
      <input
        type="radio"
        name={`status-${classId}`}
        id={`${classId}-${label}`}
        value={label}
        checked={data.status === label}
        onChange={(e) => handleOnchange(classId, "status", e.target.value)}
        required
      />
      <label htmlFor={`${classId}-${label}`} className="text-sm">{label}</label>
    </div>
  );
}

export default Radio;
