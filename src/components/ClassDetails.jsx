import React from "react";

function ClassDetails({ data }) {
  return (
    <div className="p-2 shadow-md text-xs flex justify-between">
      <div className="left space-y-2">
        <div className="left-top">
          <p>
            <span className="font-bold">Sent at:</span>{" "}
            {new Date(data.timestamp).toLocaleString([], {
              dateStyle: "medium",
              timeStyle: "short",
            })}
            <p>
              <span className="font-bold">Sent by:</span> {data.sender}
            </p>
          </p>
        </div>
        <div className="left-bottom">
          <h2 className="font-bold">Coaches in class:</h2>
          {data.coaches.split(", ").map((coach) => (
            <div>{coach}</div>
          ))}
        </div>
      </div>
      <div className="right">
        <div className="right-top">
          <p><span className="font-bold">Date:</span> {new Date(data.date).toLocaleDateString()}</p>
          <p><span className="font-bold">Start:</span> {new Date(data.start).toLocaleTimeString()}</p>
          <p><span className="font-bold">End:</span> {new Date(data.end).toLocaleTimeString()}</p>
        </div>
        <div className="right-bottom"></div>
      </div>
    </div>
  );
}

export default ClassDetails;
