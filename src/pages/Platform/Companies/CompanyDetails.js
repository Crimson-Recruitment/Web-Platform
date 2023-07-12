import React, { useState } from "react";
import Cookies from "universal-cookie";
import Select from "react-select";
import "flowbite/dist/flowbite.min.js";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";

function CompanyDetails() {
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
    navigate("/company-jobs");
  };
  return (
    <div className="p-10 lg:my-12 lg:mx-[200px] sm:m-5 md:m-10 grid place-items-center align-center rounded overflow-hidden shadow-lg h-min-[70vh]">
      <form onSubmit={submitHandler} className="w-full">
        <div className="mb-6">
          <label
            for="profession"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white w-full"
          >
            Company Type
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
            Company Overview
          </label>
          <textarea
            id="about"
            rows="4"
            class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Describe yourself,..."
          ></textarea>
        </div>
        <label
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          for="file_input"
        >
        <Typography variant="label">Do you have a trading license?</Typography><br/>

<div class="flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700">
    <input id="bordered-radio-1" type="radio" value="" name="bordered-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
    <label for="bordered-radio-1" class="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Default radio</label>
</div>
<div class="flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700 mb-5">
    <input checked id="bordered-radio-2" type="radio" value="" name="bordered-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
    <label for="bordered-radio-2" class="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Checked state</label>
</div>

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

export default CompanyDetails;
