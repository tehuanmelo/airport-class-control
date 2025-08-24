function Classes({ data, classId, updateClasses }) {
  return (
    <div>
      <h2>Class {classId + 1}</h2>

      <label>
        <input
          type="radio"
          name={`status-${classId}`}
          value="given"
          checked={data.status === "given"}
          onChange={e => updateClasses(classId, "status", e.target.value)}
          required
        />
        Given
      </label>

      <label>
        <input
          type="radio"
          name={`status-${classId}`}
          value="canceled"
          checked={data.status === "canceled"}
          onChange={e => updateClasses(classId, "status", e.target.value)}
          required
        />
        Canceled
      </label><br />

      <label htmlFor="start">Start Time</label>
      <input
        type="time"
        id="start"
        value={data.start}
        onChange={(e) => updateClasses(classId, "start", e.target.value)}
        required
      /> <br />

      <label htmlFor="end">End Time</label>
      <input
        type="time"
        id="end"
        value={data.end}
        onChange={(e) => {
            const newEnd = e.target.value
            if (newEnd < data.start) {
                alert("End time must be after start time")
                return
            }
            updateClasses(classId, "end", e.target.value)
        }}
        required
      /> <br />

      <label htmlFor="number">Number of students</label>
      <input
        min="0"
        type="number"
        id="number"
        value={data.students}
        onChange={(e) => updateClasses(classId, "students", e.target.value)}
        required
      /> <br /><br />
    </div>
  );
}

export default Classes;
