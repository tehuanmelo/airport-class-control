import React, { useState, useEffect } from "react";
import { getUsers, getLocations } from "./services";
import { nanoid } from "nanoid";
import { useNavigate } from "react-router-dom";

import Classes from "./Classes";
import NumberInput from "./NumberInput.jsx";
import Loading from "./Loading.jsx";

import { URL } from "../components/services.js";

function Form() {
  const [loading, setLoading] = useState(true);

  const [users, setUsers] = useState([]);
  const [locations, setLocations] = useState([]);

  const [classes, setClasses] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [numberOfClasses, setNumber] = useState("");
  const [numberOfCoaches, setNumnberOfCoaches] = useState("");
  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0]; // gives 'YYYY-MM-DD'
  });
  const [selectedCoaches, setSelectedCoaches] = useState([]);


  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const usersData = await getUsers();
      const locationsData = await getLocations();
      setUsers(usersData);
      setLocations(locationsData);
      setLoading(false);
    }
    fetchData();
  }, []);

  useEffect(() => {
    const newArray = Array.from({ length: Number(numberOfClasses) }, () => ({
      status: "",
      start: "",
      end: "",
      students: "",
    }));
    setClasses(newArray);
  }, [numberOfClasses]);

  useEffect(() => {
    const newArray = Array.from({ length: Number(numberOfCoaches) }, () => ({
      coach: "",
    }));
    setSelectedCoaches(newArray);
  }, [numberOfCoaches]);

  function updateClasses(index, key, value) {
    setClasses((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [key]: value };
      return updated;
    });
  }

  function updateSelectedCoaches(index, coach) {
    setSelectedCoaches((prev) => {
      const updated = [...prev];
      updated[index] = { coach };
      return updated;
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const newData = classes.map((classData) => {
      return {
        id: nanoid(),
        timeStamp: new Date(),
        date,
        sender: selectedUser,
        location: selectedLocation,
        status: classData.status,
        startTime: classData.start,
        endTime: classData.end,
        numberOfStudents: classData.students,
        numberOfCoaches: selectedCoaches.length,
        coachesInClass: selectedCoaches.map((coach) => coach.coach).join(", "),
      };
    });

    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
          // "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
      });

      const result = await response.json();
      if (result.status === "success") {
        console.log("Submitted successfully:", result);
        console.log(newData);
        navigate("/");
      }
    } catch (error) {
      console.error("Submission failed:", error);
      alert("Network Error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <form
          onSubmit={handleSubmit}
          className="max-w-xl mx-auto mt-6 p-6 bg-white shadow-md rounded-lg space-y-1 mt-20"
        >
          <label
            htmlFor="coach"
            className="block text-sm font-bold text-gray-700 p-2"
          >
            Who is submiting the form?
          </label>
          <select
            id="coach"
            required
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
            className="block w-full p-2 border mb-3 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="" disabled>
              -- Select the coach --
            </option>
            {users.map((user) => (
              <option
                key={user.coach}
                value={user.coach}
              >{`${user.coach}`}</option>
            ))}
          </select>

          <label
            className="block text-sm font-bold text-gray-700 p-2"
            htmlFor="coach"
          >
            Location of the Classes
          </label>
          <select
            id="location"
            required
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="block w-full p-2 border mb-3 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="" disabled>
              -- Select the location --
            </option>
            {locations.map((location) => (
              <option
                key={location.base}
                value={location.base}
              >{`${location.base}`}</option>
            ))}
          </select>

          <label
            className="block text-sm font-bold text-gray-700 p-2"
            htmlFor="date"
          >
            Date of the class
          </label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="block w-full p-2 border mb-3 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />

          <NumberInput
            state={numberOfClasses}
            handleOnChange={setNumber}
            label="How many classes do you want to send?"
          />

          {classes.map((classObj, index) => (
            <Classes
              key={index}
              data={classObj}
              classId={index}
              updateClasses={updateClasses}
            />
          ))}

          {numberOfClasses > 0 && (
            <>
              <NumberInput
                handleOnChange={setNumnberOfCoaches}
                state={numberOfCoaches}
                label="How many coaches were in class?"
              />
              {numberOfCoaches > 0 &&
                selectedCoaches.map((coachData, index) => {
                  return (
                    <div key={`${index}-${coachData.coach}`}>
                      <label
                        htmlFor={`${index}-${coachData.coach}`}
                        className="block text-sm font-bold text-gray-700 p-2"
                      >
                        Select coach {index + 1}
                      </label>
                      <select
                        id={`${index}-${coachData.coach}`}
                        required
                        value={selectedCoaches[index]?.coach || ""}
                        onChange={(e) =>
                          updateSelectedCoaches(index, e.target.value)
                        }
                        className="block w-full p-2 border mb-3 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="" disabled>
                          -- Select the coach --
                        </option>
                        {users.map((user, index) => (
                          <option
                            key={`${index}-${user.coach}`}
                            value={user.coach}
                          >{`${user.coach}`}</option>
                        ))}
                      </select>
                    </div>
                  );
                })}
            </>
          )}

          <button
            className="cursor-pointer mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1shadow-md transition"
            type="submit"
          >
            Submit
          </button>
        </form>
      )}
    </>
  );
}

export default Form;
