import React, { useState } from "react";
import Cookies from "universal-cookie";
import Select from "react-select";
import "flowbite/dist/flowbite.min.js";
import { useNavigate } from "react-router-dom";

function Skills() {
  const cookie = new Cookies();
  const [selectedSkills, setSelectedSkills] = useState();
  const [selectedProfession, setSelectedProfession] = useState();
  const navigate = useNavigate();

  const skillList = [
    { value: "red", label: "Red" },
    { value: "green", label: "Green" },
    { value: "yellow", label: "Yellow" },
    { value: "blue", label: "Blue" },
    { value: "white", label: "White" },
  ];
  const professionList = [
    { value: "medicine", label: "Medicine" },
    { value: "software developer", label: "Software Developer" },
    { value: "law", label: "Law" },
    { value: "Accounting and Finance", label: "Accounting & Finance" },
    { value: "civil engineering", label: "Civil Engineering" },
  ];

  const submitHandler = () => {
    navigate("/jobs");
  };
  return (
    <div className="p-10 lg:my-12 lg:mx-[200px] sm:m-5 md:m-10 grid place-items-center align-center rounded overflow-hidden shadow-lg h-min-[70vh]">
      <form onSubmit={submitHandler} className="w-full">
        <div className="mb-6">
          <label
            for="profession"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white w-full"
          >
            Profession
          </label>
          <Select
            className="bg-gray-50 border mb-4 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            options={professionList}
            placeholder="Medicine, technology,....."
            onChange={(val) => {
              setSelectedProfession(val);
            }}
            isSearchable={true}
            value={selectedProfession}
          />
        </div>
        <div className="mb-6">
          <label
            for="About you"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            About you
          </label>
          <textarea
            id="about"
            rows="4"
            class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Describe yourself,..."
          ></textarea>
        </div>
        <label
          for="skills"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Select your prominent skills (6 max).
        </label>
        <Select
          className="bg-gray-50 border mb-4 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          options={skillList}
          placeholder="Select skills,..."
          onChange={(val) => {
            if (val.length <= 6) {
              setSelectedSkills(val);
            } else {
              alert("Max number of skills added!");
            }
          }}
          isSearchable={true}
          value={selectedSkills}
          isMulti
        />

        <label
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          for="file_input"
        >
          Upload you Resume
        </label>
        <input
          class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          id="file_input"
          accept=".pdf,.doc,.docx"
          type="file"
        />

        <button
          type="submit"
          className="mt-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Skills;
