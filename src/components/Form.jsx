import React, { useState, useEffect } from "react";
import { getUsers, getLocations } from "./services";
import Classes from "./Classes";
import { nanoid } from "nanoid";

import {URL} from "../components/services.js"

function Form() {
  const [loading, setLoading] = useState(true);

  const [users, setUsers] = useState([]);
  const [locations, setLocations] = useState([]);

  const [classes, setClasses] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [number, setNumber] = useState(0);
  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0]; // gives 'YYYY-MM-DD'
  });
  const [selectedCoaches, setSelectedCoaches] = useState([]);

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
    const newArray = Array.from({ length: Number(number) }, () => ({
      status: "",
      start: "",
      end: "",
      students: "",
    }));
    setClasses(newArray);
  }, [number]);

  function updateClasses(index, key, value) {
    setClasses((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [key]: value };
      return updated;
    });
  }

  function updateSelectedCoaches(coach) {
    setSelectedCoaches((prev) =>
      prev.includes(coach)
        ? prev.filter((item) => item !== coach)
        : [...prev, coach]
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (selectedCoaches.length < 1) {
      alert("Select at least one coach")
      return
    }

    const newData = classes.map(classData => {
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
        coachesInClass: selectedCoaches.join(", ")
      }

    })

    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(newData),
      });

      const result = await response.text();
      console.log("Submitted successfully:", result);
      console.log(newData);
    } catch (error) {
      console.error("Submission failed:", error);
    }
    
  }

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <label htmlFor="coach">Who is submiting the form?</label>
          <br />
          <select
            id="coach"
            required
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
          >
            <option value="" disabled>
              -- Select the coach --
            </option>
            {users.map((user, id) => (
              <option
                key={user.coach}
                value={user.coach}
              >{`${user.coach}`}</option>
            ))}
          </select>
          <br />

          <label htmlFor="coach">Location of the Classes</label>
          <br />
          <select
            id="location"
            required
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
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
          <br />

          <label htmlFor="date">Date of the class</label>
          <br />
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
          <br />

          <label htmlFor="number">How many classes do you want to send?</label>
          <br />
          <input
            id="number"
            type="number"
            min="1"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            required
          />
          <br />

          {classes.map((classObj, index) => (
            <Classes
              key={index}
              data={classObj}
              classId={index}
              updateClasses={updateClasses}
            />
          ))}
          <h2>Who was in class?</h2>
          {number > 0 &&
            users.map((user) => (
              <>
                <input
                  type="checkbox"
                  id={`${user.coach}`}
                  checked={selectedCoaches?.includes(user.coach) || false}
                  onChange={() => updateSelectedCoaches(user.coach)}
                />
                <label htmlFor="coach">{user.coach}</label><br />
              </>
            ))}

          <button type="submit">Submit</button>
        </form>
      )}
    </>
  );
}

export default Form;
