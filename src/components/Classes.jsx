import NumberInput from "./NumberInput";
import Radio from "./Radio";
import TimeInput from "./TimeInput";

function Classes({ data, classId, updateClasses }) {
  return (
    <div className=" p-2 mb-3 rounded-md shadow-sm border border-gray-300 space-y-1">
      <h2 className=" block w-full font-bold p-2 text-sm">
        Class {classId + 1}
      </h2>
      <div className="flex space-x-3">
        <Radio
          handleOnchange={updateClasses}
          data={data}
          classId={classId}
          label="Given"
        />
        <Radio
          handleOnchange={updateClasses}
          data={data}
          classId={classId}
          label="Canceled"
        />
      </div>
      <TimeInput
        handleOnChange={updateClasses}
        data={data}
        classId={classId}
        label="Start Time"
        inputId="start"
      />
      <TimeInput
        handleOnChange={updateClasses}
        data={data}
        classId={classId}
        label="End Time"
        inputId="end"
      />
      <label
        htmlFor={classId}
        className="block text-sm p-2"
      >
        Number of students
      </label>
      <input
        min="0"
        type="number"
        placeholder="Insert the number of students..."
        id={classId}
        value={data.students}
        onChange={(e) => updateClasses(classId, "students", e.target.value)}
        required
        className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
      />{" "}
      <br />
      <br />
    </div>
  );
}

export default Classes;
