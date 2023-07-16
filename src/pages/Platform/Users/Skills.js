import React, { useState, useEffect, useReducer } from "react";

import Select from "react-select";
import "flowbite/dist/flowbite.min.js";
import { useNavigate, useLocation } from "react-router-dom";
import { professionList, skills } from "../../../Data/UserProfessions";
import Firestore from "../../../Firebase/Firestore";
import Storage from "../../../Firebase/Storage";
import { Button } from "@mui/material";
import { skillsReducer } from "../../../Functions/Reducers";

let initState = {
  selectedSkills:null,
  selectedProfession:null,
  image:null,
  imagePath:null,
  resume:null,
  loading:false
}

function Skills() {
  const [state, dispatch] = useReducer(skillsReducer,initState);
  const navigate = useNavigate();
  const firestore = new Firestore();
  const db = new Storage();

  const user = JSON.parse(sessionStorage.getItem("userData"));
  const submitHandler = async (event) => {
    event.preventDefault();
    dispatch({type:"SETLOADING", loading:true})
    let imagelink = "";
    if (state.imagePath != null) {
      imagelink = await db.getFileUrl(`${user.id}-image`, state.imagePath);
      if (imagelink.code === 1) {
        alert(imagelink.val);
        dispatch({type:"SETLOADING", loading:false})
        return;
      }
    }
    let resumelink = "";
    if (state.resume != null) {
      resumelink = await db.getFileUrl(`${user.id}-resume`, state.resume);
      if (resumelink.code === 1) {
        alert(resumelink.val);
        dispatch({type:"SETLOADING", loading:false})
        return;
      }
    }
    await firestore
      .createUserDetails(
        user.id,
        user.firstName,
        user.lastName,
        user.email,
        user.phoneNumber,
        user.location,
        imagelink.val,
        state.selectedSkills,
        resumelink.val,
        event.target["about"].value,
        state.selectedProfession
      )
      .then((res) => {
        if (res.code === 0) {
          navigate("/jobs");
          dispatch({type:"SETLOADING", loading:false})
        } else {
          alert(res.val);
          dispatch({type:"SETLOADING", loading:false})
        }
      })
      .catch((err) => {
        alert(err);
        dispatch({type:"SETLOADING", loading:false})
      });
  };

  const imageHandler = (e) => {
    let reader = new FileReader();
    reader.readAsArrayBuffer(e.target.files[0]);

    reader.onload = () => {
      dispatch({type:"SETIMAGEPATH", imagePath:reader.result})
    };
    reader.onerror = () => {
      alert(reader.error);
    };
    dispatch({type:"SETIMAGE", image:e.target.files[0]})
  };

  const resumeHandler = (e) => {
    let reader = new FileReader();
    reader.readAsArrayBuffer(e.target.files[0]);
    reader.onload = () => {
      dispatch({type:"SETRESUME", resume:reader.result})
    };
    reader.onerror = () => {
      alert(reader.error);
    };
  };
  return (
    <div className="p-10 lg:my-12 lg:mx-[200px] sm:m-5 md:m-10 grid place-items-center align-center rounded overflow-hidden shadow-lg h-min-[70vh]">
      <form onSubmit={submitHandler} className="w-full">
        <div className="mb-6">
          {state.image != null ? (
            <div className="flex justify-center mb-5">
              <img
                className="h-[400px] w-[400px] rounded-full"
                src={URL.createObjectURL(state.image)}
              />
              :
            </div>
          ) : (
            <div class="flex items-center justify-center w-full">
              <label
                for="dropzone-file"
                class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                <div class="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span class="font-semibold">Click to upload</span> or drag
                    and drop
                  </p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">
                    JPEG, PNG, or JPG
                  </p>
                </div>
              </label>
            </div>
          )}
          <input
            onChange={imageHandler}
            id="dropzone-file"
            type="file"
            accept=".jpeg, .png, .jpg"
            class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          />

          <label
            for="profession"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white w-full"
          >
            Profession
          </label>
          <Select
            className="bg-gray-50 border mb-4 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
            options={professionList}
            placeholder="Medicine, technology,....."
            onChange={(val) => {
              dispatch({type:"SETSELECTEDPROFESSION", selectedProfession:val})
            }}
            isSearchable={true}
            value={state.selectedProfession}
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
            name="about"
            class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
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
          className="bg-gray-50 border mb-4 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
          options={skills}
          placeholder="Select skills,..."
          onChange={(val) => {
            if (val.length <= 6) {
              dispatch({type:"SETSELECTEDSKILLS", selectedSkills:val})
            } else {
              alert("Max number of skills added!");
            }
          }}
          isSearchable={true}
          value={state.selectedSkills}
          isMulti
        />

        <label
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          for="file_input"
        >
          Upload you Resume
        </label>
        <input
          onChange={resumeHandler}
          class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          id="file_input"
          accept=".pdf,.doc,.docx"
          type="file"
        />

        <Button
          disabled={state.loading}
          type="submit"
          variant="contained"
          sx={{
            mt: 3,
            mb: 2,
            backgroundColor: "green",
            ":hover": { backgroundColor: "darkgreen" },
          }}
        >
          {state.loading ? "Loading..." : "Submit"}
        </Button>
      </form>
    </div>
  );
}

export default Skills;
